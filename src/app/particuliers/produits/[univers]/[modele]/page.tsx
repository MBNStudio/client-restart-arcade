import type { Metadata } from 'next'
import { ModeleView, modeleMetadata, modeleParams } from '@/components/v2/ProductPages'

type Props = { params: Promise<{ univers: string; modele: string }> }

export const dynamicParams = false
export const generateStaticParams = () => modeleParams('particulier')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { univers, modele } = await params
  return modeleMetadata('particulier', univers, modele)
}

export default async function Page({ params }: Props) {
  const { univers, modele } = await params
  return <ModeleView id="particulier" univers={univers} modele={modele} />
}
