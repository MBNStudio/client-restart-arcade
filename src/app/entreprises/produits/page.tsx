import { CatalogueView, catalogueMetadata } from '@/components/v2/ProductPages'

export const metadata = catalogueMetadata('entreprise')

export default function Page() {
  return <CatalogueView id="entreprise" />
}
