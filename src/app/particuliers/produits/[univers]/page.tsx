import type { Metadata } from 'next'
import { UniversView, universMetadata, universParams } from '@/components/v2/ProductPages'

type Props = { params: Promise<{ univers: string }> }

export const dynamicParams = false
export const generateStaticParams = () => universParams('particulier')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { univers } = await params
  return universMetadata('particulier', univers)
}

export default async function Page({ params }: Props) {
  const { univers } = await params
  return <UniversView id="particulier" slug={univers} />
}
