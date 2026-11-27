import { League_Spartan, Poppins } from 'next/font/google'

/**
 * Police de texte de la charte RESTART (novembre 2026) : Poppins (Regular, Bold, Italic).
 * La police des titres, Orbitron, vient de lib/fonts.ts (variable --ff-orbitron).
 */
const poppinsRegular = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: 'normal', variable: '--ff-poppins', display: 'swap' })
const poppinsItalic = Poppins({ subsets: ['latin'], weight: ['400'], style: 'italic', variable: '--ff-poppins-italic', display: 'swap', preload: false })

/** Numéros des blocs « 01 / 02 / 03 » : League Spartan en gras (demande de RESTART du 27 novembre 2026). */
const spartan = League_Spartan({ subsets: ['latin'], weight: ['800'], variable: '--ff-spartan', display: 'swap' })

export const v2FontVariables = `${poppinsRegular.variable} ${poppinsItalic.variable} ${spartan.variable}`
