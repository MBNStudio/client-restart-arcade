import { audienceMetadata } from '@/components/AudiencePage'
import { EspaceHome } from '@/components/v2/Homes'
import { audiencePage } from '@/data/audiencePages'

const page = audiencePage('bar-commerce')

export const metadata = audienceMetadata(page)

export default function Page() {
  return <EspaceHome id="bar-commerce" />
}
