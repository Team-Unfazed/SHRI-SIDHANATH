import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'kharghar');

/** /real-estate-agent-kharghar.html — Kharghar resale, rental and new projects. */
export default function KhargharPage() {
  return <LocationPage data={data} />;
}
