import { CatalogueView, catalogueMetadata } from '@/components/v2/ProductPages'

export const metadata = catalogueMetadata('bar-commerce')

export default function Page() {
  return <CatalogueView id="bar-commerce" />
}
