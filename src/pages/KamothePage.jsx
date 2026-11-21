import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'kamothe');

/** /real-estate-agent-kamothe.html — Kamothe resale, rental and shops. */
export default function KamothePage() {
  return <LocationPage data={data} />;
}
