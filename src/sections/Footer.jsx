import { useState } from 'react';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import { site, tel, mailto } from '../data/site';
import './Footer.css';

const MAIN = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#listings' },
  { label: 'Locations', href: '#locations' },
  { label: 'All projects', href: '/projects.html' },
  { label: 'Agent in Panvel', href: '/real-estate-agent-panvel.html' },
  { label: 'Agent in Raigad', href: '/real-estate-agent-raigad.html' },
  { label: 'Agent in Navi Mumbai', href: '/real-estate-agent-navi-mumbai.html' },
];

const PRACTICE = [
  { label: 'How we work', href: '#process' },
  { label: 'On the record', href: '#record' },
  { label: 'Developers', href: '#developers' },
  { label: 'Questions', href: '#faq' },
];

export default function Footer({ ref }) {
  const [q, setQ] = useState('');

  /**
   * The template puts a newsletter signup here. There is no list to join and no
   * backend to join it with, so the field composes an email instead — one that
   * actually reaches the desk. A form that quietly discards what is typed into
   * it is worse than no form at all.
   */
  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Property enquiry');
    const body = encodeURIComponent(q.trim());
    const query = body ? '?subject=' + subject + '&body=' + body : '?subject=' + subject;
    window.location.href = mailto + query;
  };

  return (
    <footer className="ftz on-dark" id="contact" ref={ref}>
      <div className="wrap">
        <Reveal className="ftz__top">
          <div className="ftz__pitch">
            <SplitReveal as="h2" className="h1">
              From requirement to keys —
              <br />
              start with one call
            </SplitReveal>
            <Pill href={tel} className="pill--block-sm">
              {site.phoneDisplay}
            </Pill>
          </div>

          <form className="ftz__form" onSubmit={send}>
            <p className="mono-sm">Enquiry</p>
            <p className="ftz__formlede">
              Tell us what you are looking for and we will come back to you.
            </p>
            <div className="ftz__field">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="2 BHK in Kharghar, under 1 Cr…"
                aria-label="What are you looking for?"
              />
              <button type="submit" className="ftz__send mono-sm">
                Send
              </button>
            </div>
          </form>
        </Reveal>

        <hr className="ftz__rule" />

        <div className="ftz__cols">
          <div>
            <p className="ftz__ch mono-sm">Email</p>
            <ul>
              {site.emails.slice(0, 2).map((e) => (
                <li key={e}>
                  <a href={'mailto:' + e}>{e}</a>
                </li>
              ))}
            </ul>
            <p className="ftz__ch mono-sm ftz__ch--gap">Phone</p>
            <ul>
              <li>
                <a href={tel}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="ftz__ch mono-sm">Location</p>
            <address>
              {site.address.line1},
              <br />
              {site.address.line2}, {site.address.line3},
              <br />
              {site.address.city} {site.address.pincode}
            </address>
            <p className="ftz__ch mono-sm ftz__ch--gap">Social</p>
            <ul>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.social.youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="ftz__ch mono-sm">Pages</p>
            <ul>
              {MAIN.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ftz__ch mono-sm">Practice</p>
            <ul>
              {PRACTICE.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ftz__ch mono-sm">Registration</p>
            <ul>
              <li>
                {site.reraAuthority} {site.rera}
              </li>
              <li>{site.legalName}</li>
              <li>Proprietor: {site.proprietor}</li>
            </ul>
          </div>
        </div>

        {/* One plain paragraph that says who, what and where in the words
            people search with. Every claim in it is on the page already. */}
        <p className="ftz__about">
          {site.fullName} is a {site.reraAuthority}-registered real estate agency and property
          consultant in New Panvel, Navi Mumbai, rated {site.google.rating} on Google from{' '}
          {site.google.reviews} reviews. We help families and investors buy, sell and rent flats,
          shops, offices and land in Panvel, New Panvel, Kharghar, Kamothe, Kalamboli, Taloja and
          Ulwe, and take selective mandates in Mumbai, Thane, Raigad and Pune.
        </p>

        <p className="ftz__base mono-sm">
          © {new Date().getFullYear()} {site.fullName} · Open {site.google.hoursLabel}
        </p>
      </div>
    </footer>
  );
}
