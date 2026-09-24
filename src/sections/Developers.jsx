import Label from '../components/Label';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import ScrollFill from '../components/ScrollFill';
import { developers } from '../data/content';
import { site } from '../data/site';
import './Developers.css';

/* Only the names evidenced on the client's own posts. The rest of the list in
   the content layer is marked unevidenced and stays off the page. */
const NAMES = developers.filter((d) => d.evidenced).map((d) => d.name);

export default function Developers() {
  return (
    <section className="dev band" id="developers">
      <div className="wrap">
        <Reveal className="dev__head">
          <div>
            <Label>Developers</Label>
            <h2 className="h1 dev__title">Projects we market</h2>
          </div>
          <p className="lede dev__note">
            Names shown are developers whose projects {site.name} has marketed. It is
            not a claim of partnership, agency or appointment.
          </p>
        </Reveal>
      </div>

      {/* Two identical tracks so the loop has no seam. The second is hidden
          from the accessibility tree — it is the same list twice. */}
      <div className="dev__marquee">
        <ul className="dev__track">
          {NAMES.map((n) => (
            <li key={n} className="h4">
              {n}
              <span aria-hidden="true">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
            </li>
          ))}
        </ul>
        <ul className="dev__track" aria-hidden="true">
          {NAMES.map((n) => (
            <li key={n} className="h4">
              {n}
              <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap">
        <Reveal className="dev__rating">
          <div className="dev__score">
            <p className="dev__number">{site.google.rating}</p>
            <div>
              <p className="dev__stars" aria-hidden="true">
                {'\u2605'.repeat(5)}
              </p>
              <p className="mono-sm">
                {site.google.reviews} Google reviews &middot; verified 12 Sep 2026
              </p>
            </div>
          </div>

          <ScrollFill className="dev__claim h4">
            The only rating on this site is the one Google publishes, and it is printed
            exactly as it stands.
          </ScrollFill>

          <Pill tone="black" href={site.google.url} target="_blank" rel="noreferrer" className="pill--block-sm">
            Read them yourself
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}
