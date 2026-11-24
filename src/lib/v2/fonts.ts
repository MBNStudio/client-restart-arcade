import { Poppins } from 'next/font/google'

/**
 * Police de texte de la charte RESTART (novembre 2026) : Poppins (Regular, Bold, Italic).
 * La police des titres, Orbitron, vient de lib/fonts.ts (variable --ff-orbitron).
 */
const poppinsRegular = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: 'normal', variable: '--ff-poppins', display: 'swap' })
const poppinsItalic = Poppins({ subsets: ['latin'], weight: ['400'], style: 'italic', variable: '--ff-poppins-italic', display: 'swap', preload: false })

export const v2FontVariables = `${poppinsRegular.variable} ${poppinsItalic.variable}`
