import { Manrope } from 'next/font/google'

/** Police de texte du thème Atelier (celle d'ab-agencement.com). Les autres viennent de lib/fonts.ts. */
const manrope = Manrope({ subsets: ['latin'], variable: '--ff-manrope', display: 'swap' })

export const v2FontVariables = manrope.variable
