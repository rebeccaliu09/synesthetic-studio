import { useState, useEffect, useRef } from 'react'

function makeNoiseBuffer(ctx, seconds) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buf
}

function buildSoundscape(ctx, moodType) {
  const master = ctx.createGain()
  master.gain.value = 0.7
  master.connect(ctx.destination)

  const startable = []

  const osc = (type, freq, gainVal, target = master) => {
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.value = freq
    const g = ctx.createGain()
    g.gain.value = gainVal
    o.connect(g)
    g.connect(target)
    startable.push(o)
    return { osc: o, gain: g }
  }

  const noise = (seconds, gainVal, target = master) => {
    const src = ctx.createBufferSource()
    src.buffer = makeNoiseBuffer(ctx, seconds)
    src.loop = true
    const g = ctx.createGain()
    g.gain.value = gainVal
    src.connect(g)
    g.connect(target)
    startable.push(src)
    return { src, gain: g }
  }

  const lfo = (freq, depth, targetParam) => {
    const l = ctx.createOscillator()
    l.type = 'sine'
    l.frequency.value = freq
    const lg = ctx.createGain()
    lg.gain.value = depth
    l.connect(lg)
    lg.connect(targetParam)
    startable.push(l)
    return l
  }

  switch (moodType) {
    case 'Pearl': {
      const { gain: g1 } = osc('sine', 528, 0.03)
      lfo(0.3, 0.01, g1.gain)
      osc('sine', 1056, 0.015)

      const ir = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate)
      const irData = ir.getChannelData(0)
      for (let i = 0; i < irData.length; i++)
        irData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irData.length, 2)
      const conv = ctx.createConvolver()
      conv.buffer = ir
      const revGain = ctx.createGain()
      revGain.gain.value = 0.4
      g1.connect(conv)
      conv.connect(revGain)
      revGain.connect(master)
      break
    }

    case 'Moon': {
      const { gain: g1 } = osc('sine', 174, 0.04)
      lfo(0.1, 0.015, g1.gain)
      osc('sine', 261, 0.02)
      noise(2, 0.008)
      break
    }

    case 'Chrome': {
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 400
      const g1 = ctx.createGain()
      g1.gain.value = 0.025
      const s = ctx.createOscillator()
      s.type = 'sawtooth'
      s.frequency.value = 80
      s.connect(g1)
      g1.connect(filter)
      filter.connect(master)
      startable.push(s)
      lfo(0.8, 100, filter.frequency)
      osc('square', 320, 0.01)
      break
    }

    case 'Forest': {
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 800
      filter.Q.value = 0.5
      const { src: nSrc, gain: nGain } = noise(2, 0.06, filter)
      nSrc.disconnect()
      nSrc.connect(filter)
      filter.connect(nGain)
      nGain.connect(master)
      lfo(0.05, 0.03, nGain.gain)
      osc('sine', 174, 0.02)
      break
    }

    case 'Velvet': {
      const filter1 = ctx.createBiquadFilter()
      filter1.type = 'lowpass'
      filter1.frequency.value = 300
      const { gain: g1 } = osc('sine', 110, 0.05, filter1)
      filter1.connect(master)
      lfo(0.2, 0.02, g1.gain)

      const filter2 = ctx.createBiquadFilter()
      filter2.type = 'lowpass'
      filter2.frequency.value = 300
      const { gain: g2 } = osc('sine', 165, 0.025, filter2)
      g2.disconnect()
      g2.connect(filter2)
      filter2.connect(master)
      break
    }

    case 'Rose': {
      const { gain: g1 } = osc('sine', 396, 0.025)
      lfo(0.4, 0.01, g1.gain)
      osc('sine', 528, 0.015)
      osc('sine', 264, 0.02)
      break
    }

    case 'Flame': {
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 200
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 2000
      const { src: nSrc, gain: nGain } = noise(2, 0.08, hp)
      nSrc.disconnect()
      nSrc.connect(hp)
      hp.connect(lp)
      lp.connect(nGain)
      nGain.connect(master)
      lfo(3, 0.03, nGain.gain)
      break
    }

    case 'Mist': {
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 400
      const { src: nSrc, gain: nGain } = noise(2, 0.04, filter)
      nSrc.disconnect()
      nSrc.connect(filter)
      filter.connect(nGain)
      nGain.connect(master)

      const { gain: g1 } = osc('sine', 220, 0.015)
      lfo(0.08, 0.007, g1.gain)
      osc('sine', 330, 0.008)
      break
    }

    default:
      break
  }

  return startable
}

export default function useAmbientSound(moodType) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const ctxRef = useRef(null)
  const nodesRef = useRef([])
  const startedRef = useRef(false)

  useEffect(() => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) { setIsSupported(false); return }
      const ctx = new AC()
      ctxRef.current = ctx
      startedRef.current = false
      nodesRef.current = buildSoundscape(ctx, moodType)
    } catch {
      setIsSupported(false)
    }
    return () => {
      ctxRef.current?.close()
    }
  }, [moodType])

  function toggle() {
    const ctx = ctxRef.current
    if (!ctx) return
    if (!isPlaying) {
      ctx.resume().then(() => {
        if (!startedRef.current) {
          nodesRef.current.forEach((n) => n.start())
          startedRef.current = true
        }
        setIsPlaying(true)
      })
    } else {
      ctx.suspend().then(() => setIsPlaying(false))
    }
  }

  return { isPlaying, toggle, isSupported }
}
