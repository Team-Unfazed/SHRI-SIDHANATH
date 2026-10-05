import LocationPage from './LocationPage';
import { locationPages } from '../data/content';

const data = locationPages.find((l) => l.id === 'raigad');

/** /real-estate-agent-raigad.html — land and plotted development. */
export default function RaigadPage() {
  return <LocationPage data={data} />;
}
