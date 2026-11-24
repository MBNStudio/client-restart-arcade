import { ActualiteView, actualiteMetadata } from '@/components/v2/ActualitePage'

export const metadata = actualiteMetadata('entreprise')

export default function Page() {
  return <ActualiteView id="entreprise" />
}
