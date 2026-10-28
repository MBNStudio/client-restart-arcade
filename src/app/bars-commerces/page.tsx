import { audienceMetadata } from '@/components/AudiencePage'
import { PlateauEspaceHome } from '@/components/plateau/PlateauEspaceHome'
import { audiencePage } from '@/data/audiencePages'

const page = audiencePage('bar-commerce')

export const metadata = audienceMetadata(page)

export default function BarsCommercesPage() {
  return <PlateauEspaceHome page={page} />
}
