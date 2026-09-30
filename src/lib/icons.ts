import {
  Activity, Atom, Baby, Bone, Brain, Calculator, Cross, Dna, Droplet, Eye,
  FlaskConical, Gavel, Globe, Heart, Landmark, Languages, Leaf, Lightbulb,
  Microscope, Pill, Scale, Sparkles, Stethoscope, Syringe, Thermometer,
  type LucideIcon,
} from 'lucide-react'

/** Ícones disponíveis para identificar um assunto. */
export const SUBJECT_ICONS: Record<string, LucideIcon> = {
  Activity, Atom, Baby, Bone, Brain, Calculator, Cross, Dna, Droplet, Eye,
  FlaskConical, Gavel, Globe, Heart, Landmark, Languages, Leaf, Lightbulb,
  Microscope, Pill, Scale, Sparkles, Stethoscope, Syringe, Thermometer,
}

export const ICON_NAMES = Object.keys(SUBJECT_ICONS)

export function iconFor(name: string): LucideIcon {
  return SUBJECT_ICONS[name] ?? Activity
}

/** Paleta de cores de assunto, em HSL "H S% L%" para casar com os tokens. */
export const SUBJECT_COLORS = [
  '45 93% 56%',  // amarelo
  '86 54% 51%',  // verde
  '198 75% 52%', // azul
  '345 77% 48%', // vermelho/carmim
]
