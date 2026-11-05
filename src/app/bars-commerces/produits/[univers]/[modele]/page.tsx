import type { Metadata } from 'next'
import { ModeleView, modeleMetadata, modeleParams } from '@/components/v2/ProductPages'

type Props = { params: Promise<{ univers: string; modele: string }> }

export const dynamicParams = false
export const generateStaticParams = () => modeleParams('bar-commerce')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { univers, modele } = await params
  return modeleMetadata('bar-commerce', univers, modele)
}

export default async function Page({ params }: Props) {
  const { univers, modele } = await params
  return <ModeleView id="bar-commerce" univers={univers} modele={modele} />
}
