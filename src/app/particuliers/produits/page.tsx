import { CatalogueView, catalogueMetadata } from '@/components/v2/ProductPages'

export const metadata = catalogueMetadata('particulier')

export default function Page() {
  return <CatalogueView id="particulier" />
}
