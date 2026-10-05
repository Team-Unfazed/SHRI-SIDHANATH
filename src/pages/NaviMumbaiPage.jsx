import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'navi-mumbai');

/** /real-estate-agent-navi-mumbai.html — Vashi, Nerul, Kharghar, Belapur. */
export default function NaviMumbaiPage() {
  return <LocationPage data={data} />;
}
