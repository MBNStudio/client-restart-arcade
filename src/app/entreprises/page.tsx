import { audienceMetadata } from '@/components/AudiencePage'
import { PlateauEspaceHome } from '@/components/plateau/PlateauEspaceHome'
import { audiencePage } from '@/data/audiencePages'

const page = audiencePage('entreprise')

export const metadata = audienceMetadata(page)

export default function EntreprisesPage() {
  return <PlateauEspaceHome page={page} />
}
