// Voice guidance via the browser Web Speech API — no audio files, works offline.
// Uses Spanish (Spain) or English (UK) voices from the device.

let enabled = localStorage.getItem('forma_voice') !== 'false' // on by default
let voices = []

function loadVoices() {
  if (typeof speechSynthesis === 'undefined') return
  voices = speechSynthesis.getVoices()
}
if (typeof speechSynthesis !== 'undefined') {
  loadVoices()
  speechSynthesis.onvoiceschanged = loadVoices
}

function pickVoice(lang) {
  const want = lang === 'es' ? 'es-ES' : 'en-GB'
  // exact locale first, then language family
  return (
    voices.find(v => v.lang === want) ||
    voices.find(v => v.lang && v.lang.startsWith(lang === 'es' ? 'es' : 'en')) ||
    null
  )
}

export function voiceEnabled() {
  return enabled
}

export function setVoiceEnabled(on) {
  enabled = on
  localStorage.setItem('forma_voice', on ? 'true' : 'false')
  if (!on && typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
}

export function speak(text, lang = 'es') {
  if (!enabled || typeof speechSynthesis === 'undefined' || !text) return
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'es' ? 'es-ES' : 'en-GB'
    const v = pickVoice(lang)
    if (v) u.voice = v
    u.rate = 0.92
    u.pitch = 1
    speechSynthesis.speak(u)
  } catch {}
}

export function stopSpeak() {
  if (typeof speechSynthesis !== 'undefined') {
    try { speechSynthesis.cancel() } catch {}
  }
}
