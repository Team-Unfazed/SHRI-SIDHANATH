import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'panvel');

/** /real-estate-agent-panvel.html — the deepest of the three location pages. */
export default function PanvelPage() {
  return <LocationPage data={data} />;
}
