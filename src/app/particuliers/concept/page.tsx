import { ConceptView, conceptMetadata } from '@/components/v2/ConceptPage'

export const metadata = conceptMetadata('particulier')

export default function Page() {
  return <ConceptView id="particulier" />
}
