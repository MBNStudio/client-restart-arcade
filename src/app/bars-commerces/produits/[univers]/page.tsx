import type { Metadata } from 'next'
import { UniversView, universMetadata, universParams } from '@/components/v2/ProductPages'

type Props = { params: Promise<{ univers: string }> }

export const dynamicParams = false
export const generateStaticParams = () => universParams('bar-commerce')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { univers } = await params
  return universMetadata('bar-commerce', univers)
}

export default async function Page({ params }: Props) {
  const { univers } = await params
  return <UniversView id="bar-commerce" slug={univers} />
}
