import { audienceMetadata } from '@/components/AudiencePage'
import { EspaceHome } from '@/components/v2/Homes'
import { audiencePage } from '@/data/audiencePages'

const page = audiencePage('particulier')

export const metadata = audienceMetadata(page)

export default function Page() {
  return <EspaceHome id="particulier" />
}
