// Vibración háptica. Útil aquí porque durante los ejercicios faciales tienes
// las manos en la cara y no estás mirando la pantalla: el móvil te avisa.
// Se puede desactivar; la preferencia se guarda.

const KEY = 'faceo_haptics'

export function hapticsEnabled() {
  return localStorage.getItem(KEY) !== 'off'
}

export function setHaptics(on) {
  localStorage.setItem(KEY, on ? 'on' : 'off')
}

function fire(pattern) {
  if (!hapticsEnabled()) return
  try { navigator.vibrate?.(pattern) } catch {}
}

export const haptic = {
  start:    () => fire(35),          // empieza un ejercicio
  rest:     () => fire([25, 70, 25]), // toca descansar
  next:     () => fire(45),          // cambio de ejercicio
  done:     () => fire([50, 90, 50, 90, 160]), // rutina terminada
  tap:      () => fire(12),          // realimentación ligera
}
