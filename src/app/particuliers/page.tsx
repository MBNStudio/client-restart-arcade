import { audienceMetadata } from '@/components/AudiencePage'
import { PlateauEspaceHome } from '@/components/plateau/PlateauEspaceHome'
import { audiencePage } from '@/data/audiencePages'

const page = audiencePage('particulier')

export const metadata = audienceMetadata(page)

export default function ParticuliersPage() {
  return <PlateauEspaceHome page={page} />
}
