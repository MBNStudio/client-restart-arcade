import { ConceptView, conceptMetadata } from '@/components/v2/ConceptPage'

export const metadata = conceptMetadata('bar-commerce')

export default function Page() {
  return <ConceptView id="bar-commerce" />
}
