import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'new-panvel');

/** /real-estate-agent-new-panvel.html — the office's own node: East, West and Khanda Colony. */
export default function NewPanvelPage() {
  return <LocationPage data={data} />;
}
