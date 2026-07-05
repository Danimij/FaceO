// Ambient sound engine using Web Audio API — no external deps, works offline

let ctx = null
let nodes = []
let currentMode = 'off'

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function stopAll() {
  nodes.forEach(n => { try { n.stop?.(); n.disconnect?.() } catch {} })
  nodes = []
}

// Soft relaxing pad — calma
function playCalm() {
  const c = getCtx()
  ;[55, 110, 165, 220].forEach((f, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    const filter = c.createBiquadFilter()
    osc.type = 'sine'
    osc.frequency.value = f
    gain.gain.value = 0.04 / (i + 1)
    filter.type = 'lowpass'
    filter.frequency.value = 400
    osc.connect(filter); filter.connect(gain); gain.connect(c.destination)
    osc.start()
    nodes.push(osc, gain)
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.frequency.value = 0.08 + i * 0.04
    lfoGain.gain.value = 0.4
    lfo.connect(lfoGain); lfoGain.connect(osc.frequency)
    lfo.start()
    nodes.push(lfo, lfoGain)
  })
}

// 40Hz gamma isochronic pulse — concentración
function playFocus() {
  const c = getCtx()
  const carrier = c.createOscillator()
  const carrierGain = c.createGain()
  const pulseGain = c.createGain()
  carrier.type = 'sine'
  carrier.frequency.value = 200
  carrierGain.gain.value = 0.12
  pulseGain.gain.value = 0.5
  carrier.connect(carrierGain); carrierGain.connect(pulseGain); pulseGain.connect(c.destination)
  carrier.start()
  nodes.push(carrier, carrierGain, pulseGain)
  const lfo = c.createOscillator()
  const lfoGain = c.createGain()
  lfo.type = 'square'; lfo.frequency.value = 40; lfoGain.gain.value = 0.5
  lfo.connect(lfoGain); lfoGain.connect(pulseGain.gain)
  lfo.start()
  nodes.push(lfo, lfoGain)
  const bg = c.createOscillator()
  const bgGain = c.createGain()
  bg.type = 'sine'; bg.frequency.value = 80; bgGain.gain.value = 0.03
  bg.connect(bgGain); bgGain.connect(c.destination)
  bg.start()
  nodes.push(bg, bgGain)
}

// Rhythmic energizing tone
function playEnergy() {
  const c = getCtx()
  ;[110, 220, 330].forEach((f, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = i === 0 ? 'triangle' : 'sine'
    osc.frequency.value = f
    gain.gain.value = 0.05 / (i + 1)
    osc.connect(gain); gain.connect(c.destination)
    osc.start()
    nodes.push(osc, gain)
  })
  const lfo = c.createOscillator()
  const lfoGain = c.createGain()
  const master = c.createGain()
  lfo.type = 'sine'; lfo.frequency.value = 2; lfoGain.gain.value = 0.06; master.gain.value = 0.5
  lfo.connect(lfoGain); lfoGain.connect(master); master.connect(c.destination)
  lfo.start()
  nodes.push(lfo, lfoGain, master)
}

export function setMode(mode) {
  if (mode === currentMode) return
  stopAll()
  currentMode = mode
  if (mode === 'off') return
  try {
    const c = getCtx()
    if (c.state === 'suspended') c.resume()
    if (mode === 'calm') playCalm()
    if (mode === 'focus') playFocus()
    if (mode === 'energy') playEnergy()
  } catch (e) {
    console.warn('Audio error:', e)
  }
}

export function stopSound() {
  stopAll()
  currentMode = 'off'
}

export const MODES = [
  { id: 'off',    es: 'Silencio',      en: 'Silence', icon: '🔇' },
  { id: 'calm',   es: 'Calma',         en: 'Calm',    icon: '🌊' },
  { id: 'focus',  es: 'Concentración', en: 'Focus',   icon: '🎯' },
  { id: 'energy', es: 'Energía',       en: 'Energy',  icon: '⚡' },
]
