import { motion } from 'motion/react'

const press = { type: 'spring', stiffness: 420, damping: 28 }

// Motion cuida do gesto (toque). A cor e o fundo mudam por CSS.
// Regra de integração: o GSAP nunca anima este elemento, só o envolvente.
export function Button({ as = 'button', variant = 'primary', className = '', children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag className={`btn btn--${variant} ${className}`} whileTap={{ scale: 0.97 }} transition={press} {...props}>
      {children}
    </Tag>
  )
}

function Svg({ children, size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  )
}

export const Icon = {
  Plus: (p) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>,
  Check: (p) => <Svg {...p}><path d="M5 12.5l4.5 4.5L19 7" /></Svg>,
  Close: (p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>,
  Chat: (p) => <Svg {...p}><path d="M4 5h16v11H10l-5 4v-4H4z" /></Svg>,
  Phone: (p) => <Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3.5a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z" /></Svg>,
  Pin: (p) => <Svg {...p}><path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" /><circle cx="12" cy="11" r="2" /></Svg>,
  Esquerda: (p) => <Svg {...p}><path d="M15 5l-7 7 7 7" /></Svg>,
  Direita: (p) => <Svg {...p}><path d="M9 5l7 7-7 7" /></Svg>,
  Star: (p) => <Svg {...p} fill="currentColor" strokeWidth="0"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" /></Svg>,
}
