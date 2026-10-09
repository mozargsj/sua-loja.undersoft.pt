// Registo único dos plugins GSAP (todos gratuitos no pacote `gsap`).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin)

export { gsap, ScrollTrigger, SplitText, useGSAP }

// Máscara por linha: a classe `ln` gera `ln-mask`, que o CSS alarga para não cortar acentos.
export const MASK_LINES = { type: 'lines', mask: 'lines', linesClass: 'ln', autoSplit: true }
