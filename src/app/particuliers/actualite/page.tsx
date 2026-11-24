import { ActualiteView, actualiteMetadata } from '@/components/v2/ActualitePage'

export const metadata = actualiteMetadata('particulier')

export default function Page() {
  return <ActualiteView id="particulier" />
}
