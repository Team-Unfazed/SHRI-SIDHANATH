import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'kalamboli');

/** /real-estate-agent-kalamboli.html — Kalamboli resale, rental and commercial. */
export default function KalamboliPage() {
  return <LocationPage data={data} />;
}
