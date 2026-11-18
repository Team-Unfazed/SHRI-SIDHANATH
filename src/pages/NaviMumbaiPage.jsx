import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'navi-mumbai');

/** /real-estate-agent-navi-mumbai.html — Kharghar, Ulwe and the Panvel node, plus Vashi, Nerul, Belapur. */
export default function NaviMumbaiPage() {
  return <LocationPage data={data} />;
}
