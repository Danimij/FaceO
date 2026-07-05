// Generative ambient piano engine — Web Audio API, no external deps, works offline.
// Original melodies in a calm neo-classical style (Einaudi-esque chord arpeggios).
// No copyrighted material is used or reproduced.

let ctx = null
let master = null
let reverb = null
let padNodes = []
let schedulerId = null
let currentMode = 'off'
let nextTime = 0
let step = 0
let cfg = null

// ---- note helpers ----
const NAMES = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 }
function freq(note) {
  const m = /^([A-G]#?)(\d)$/.exec(note)
  const midi = NAMES[m[1]] + (parseInt(m[2]) + 1) * 12
  return 440 * Math.pow(2, (midi - 69) / 12)
}

// ---- lush reverb via generated impulse response ----
function makeReverb(c, seconds = 3) {
  const conv = c.createConvolver()
  const len = Math.floor(c.sampleRate * seconds)
  const buf = c.createBuffer(2, len, c.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
    }
  }
  conv.buffer = buf
  return conv
}

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    reverb = makeReverb(ctx, 3.2)
    const revGain = ctx.createGain()
    revGain.gain.value = 0.9
    reverb.connect(revGain)
    revGain.connect(master)
    reverb._in = reverb // convolver is its own input node
  }
  return ctx
}

// ---- a soft piano-like note with ADSR + closing lowpass ----
function piano(f, time, dur, vel) {
  const c = ctx
  const g = c.createGain()
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(3400, time)
  lp.frequency.exponentialRampToValueAtTime(650, time + dur)

  const dry = c.createGain(); dry.gain.value = 0.62
  const wet = c.createGain(); wet.gain.value = 0.55
  g.connect(lp)
  lp.connect(dry); dry.connect(master)
  lp.connect(wet); wet.connect(reverb)

  // harmonic partials for a warm tone
  ;[[1, 1], [2, 0.38], [3, 0.11], [4, 0.05]].forEach(([mult, amp]) => {
    const o = c.createOscillator()
    o.type = 'triangle'
    o.frequency.value = f * mult
    const og = c.createGain(); og.gain.value = amp
    o.connect(og); og.connect(g)
    o.start(time)
    o.stop(time + dur + 0.3)
  })

  const peak = vel * 0.2
  g.gain.setValueAtTime(0.0001, time)
  g.gain.linearRampToValueAtTime(peak, time + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur)
}

// ---- sustained pad (soft drone under the melody) ----
function startPad(notes, level) {
  const c = ctx
  notes.forEach((n, i) => {
    const o = c.createOscillator()
    const o2 = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'; o2.type = 'sine'
    o.frequency.value = freq(n)
    o2.frequency.value = freq(n) * 1.004 // gentle detune
    g.gain.value = 0
    o.connect(g); o2.connect(g)
    const wet = c.createGain(); wet.gain.value = 0.6
    g.connect(master); g.connect(wet); wet.connect(reverb)
    o.start(); o2.start()
    g.gain.linearRampToValueAtTime(level / (i + 1.5), c.currentTime + 3)
    padNodes.push(o, o2, g)
  })
}

// ---- chord progressions (I–V–vi–IV family) ----
const PROG = {
  calm: [
    { bass: 'C2', notes: ['C4', 'E4', 'G4', 'B4', 'D5'] },
    { bass: 'G2', notes: ['G3', 'B3', 'D4', 'G4', 'A4'] },
    { bass: 'A2', notes: ['A3', 'C4', 'E4', 'A4', 'C5'] },
    { bass: 'F2', notes: ['F3', 'A3', 'C4', 'E4', 'G4'] },
  ],
  focus: [
    { bass: 'A2', notes: ['A3', 'E4', 'A4', 'C5'] },
    { bass: 'F2', notes: ['F3', 'C4', 'F4', 'A4'] },
    { bass: 'C2', notes: ['C3', 'G3', 'C4', 'E4'] },
    { bass: 'G2', notes: ['G3', 'D4', 'G4', 'B4'] },
  ],
  energy: [
    { bass: 'D3', notes: ['D4', 'F#4', 'A4', 'D5', 'E5'] },
    { bass: 'A2', notes: ['A3', 'C#4', 'E4', 'A4', 'B4'] },
    { bass: 'B2', notes: ['B3', 'D4', 'F#4', 'B4', 'C#5'] },
    { bass: 'G2', notes: ['G3', 'B3', 'D4', 'G4', 'A4'] },
  ],
}

// arpeggio index pattern within a chord's notes (up-down)
const PATTERN = [0, 1, 2, 3, 4, 3, 2, 1]

function buildConfig(mode) {
  const prog = PROG[mode]
  const stepsPerChord = 8
  const interval = mode === 'calm' ? 0.52 : mode === 'focus' ? 0.85 : 0.3
  const vel = mode === 'focus' ? 0.7 : mode === 'energy' ? 0.85 : 0.8

  // pad root notes for a soft bed
  const pad = mode === 'calm' ? ['C3', 'G3'] : mode === 'focus' ? ['A2', 'E3'] : ['D3', 'A3']

  return {
    interval,
    pad,
    play(s, time) {
      const chordIdx = Math.floor(s / stepsPerChord) % prog.length
      const chord = prog[chordIdx]
      const inChord = s % stepsPerChord
      // bass on downbeat
      if (inChord === 0) piano(freq(chord.bass), time, mode === 'energy' ? 1.4 : 2.4, vel * 0.75)
      // melody note from pattern (skip some for focus to keep it sparse)
      if (mode === 'focus' && inChord % 2 === 1) return
      const notes = chord.notes
      const idx = PATTERN[inChord % PATTERN.length] % notes.length
      // slight velocity humanisation
      const v = vel * (0.82 + Math.random() * 0.25)
      piano(freq(notes[idx]), time, mode === 'energy' ? 1.1 : 1.8, v)
    },
  }
}

function stopAll() {
  if (schedulerId) { clearTimeout(schedulerId); schedulerId = null }
  if (master && ctx) {
    // fade out then hard-stop pad
    const t = ctx.currentTime
    try {
      master.gain.cancelScheduledValues(t)
      master.gain.setValueAtTime(master.gain.value, t)
      master.gain.linearRampToValueAtTime(0, t + 0.5)
    } catch {}
  }
  const toStop = padNodes.slice()
  padNodes = []
  setTimeout(() => {
    toStop.forEach(n => { try { n.stop?.(); n.disconnect?.() } catch {} })
  }, 600)
}

function runScheduler() {
  function tick() {
    while (nextTime < ctx.currentTime + 0.3) {
      cfg.play(step, nextTime)
      nextTime += cfg.interval
      step++
    }
    schedulerId = setTimeout(tick, 60)
  }
  tick()
}

export function setMode(mode) {
  if (mode === currentMode) return
  stopAll()
  currentMode = mode
  if (mode === 'off') return
  try {
    const c = getCtx()
    if (c.state === 'suspended') c.resume()
    cfg = buildConfig(mode)
    step = 0
    nextTime = c.currentTime + 0.15
    padNodes = []
    startPad(cfg.pad, mode === 'focus' ? 0.05 : 0.04)
    // fade master in
    master.gain.cancelScheduledValues(c.currentTime)
    master.gain.setValueAtTime(0.0001, c.currentTime)
    master.gain.linearRampToValueAtTime(0.9, c.currentTime + 1.6)
    runScheduler()
  } catch (e) {
    console.warn('Audio error:', e)
  }
}

export function stopSound() {
  stopAll()
  currentMode = 'off'
}

export const MODES = [
  { id: 'off',    es: 'Silencio',      en: 'Silence', icon: '—' },
  { id: 'calm',   es: 'Calma',         en: 'Calm',    icon: '◌' },
  { id: 'focus',  es: 'Concentración', en: 'Focus',   icon: '◎' },
  { id: 'energy', es: 'Energía',       en: 'Energy',  icon: '●' },
]
