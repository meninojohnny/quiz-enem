/**
 * Sons curtos sintetizados na hora; o app não embarca arquivo de áudio.
 *
 * O `AudioContext` só nasce no primeiro toque porque navegadores exigem um
 * gesto do usuário para liberar áudio. Onde a API não existe (jsdom nos
 * testes, navegador antigo), tudo vira silêncio em vez de erro.
 */

type WindowWithLegacyAudio = Window & { webkitAudioContext?: typeof AudioContext }

let context: AudioContext | null = null

function audioContext(): AudioContext | null {
  if (context) return context

  const Ctor = window.AudioContext ?? (window as WindowWithLegacyAudio).webkitAudioContext
  if (!Ctor) return null

  try {
    context = new Ctor()
  } catch {
    return null
  }
  return context
}

function beep({
  frequency,
  duration,
  type = 'square',
  gain = 0.05,
  delay = 0,
}: {
  frequency: number
  duration: number
  type?: OscillatorType
  gain?: number
  delay?: number
}): void {
  const ctx = audioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') void ctx.resume()

  const startsAt = ctx.currentTime + delay
  const oscillator = ctx.createOscillator()
  const envelope = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, startsAt)

  // Sobe e decai: cortar o ganho no seco vira um estalo audível.
  envelope.gain.setValueAtTime(0.0001, startsAt)
  envelope.gain.exponentialRampToValueAtTime(gain, startsAt + 0.01)
  envelope.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration)

  oscillator.connect(envelope)
  envelope.connect(ctx.destination)
  oscillator.start(startsAt)
  oscillator.stop(startsAt + duration)
}

export function playCorrect(): void {
  beep({ frequency: 784, duration: 0.14, type: 'triangle', gain: 0.1 })
  beep({ frequency: 1175, duration: 0.28, type: 'triangle', gain: 0.1, delay: 0.1 })
}

export function playWrong(): void {
  beep({ frequency: 220, duration: 0.18, type: 'sawtooth', gain: 0.06 })
  beep({ frequency: 165, duration: 0.3, type: 'sawtooth', gain: 0.06, delay: 0.14 })
}

/** Vinheta curta de troca de vez. */
export function playTurn(): void {
  beep({ frequency: 523, duration: 0.08, type: 'square', gain: 0.03 })
  beep({ frequency: 659, duration: 0.1, type: 'square', gain: 0.03, delay: 0.07 })
}

/** Fim de partida: arpejo subindo. */
export function playFanfare(): void {
  ;[523, 659, 784, 1047].forEach((frequency, i) =>
    beep({ frequency, duration: i === 3 ? 0.5 : 0.14, type: 'triangle', gain: 0.1, delay: i * 0.12 }),
  )
}
