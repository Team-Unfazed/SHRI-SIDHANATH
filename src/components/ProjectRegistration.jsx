/**
 * The registration record. For a project found on the MahaRERA search, the
 * number, promoter and location are from that evidence; anything carried in
 * from the client's own register (`p.register`) is labelled as such, and a
 * completion date is always the declared timeline, never a promise.
 */
export default function ProjectRegistration({ project: p }) {
  if (!p.reraNumber) return null;
  const facts = [
    ['MahaRERA number', p.reraNumber], ['Promoter', p.developer],
    ['Location', p.location], ['District', p.district], ['State', p.state],
    ['Pincode', p.pincode], ['Project type', p.projectType], ['Project status', p.status],
    ['RERA listing', p.registryStatus], ['Registration date', p.registrationDate],
    ['Proposed completion', p.completionDate], ['Address', p.address], ['Taluka', p.taluka],
    ['Survey / CTS / Plot', p.surveyDetails],
    ['Buildings', p.buildings], ['Floors', p.floors], ['Units', p.units],
    ['Configuration', p.config], ['Carpet area', p.carpet],
    ['Last modified on MahaRERA', p.sourceLastModified],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '');
  return (
    <details className="pcard__registration">
      <summary className="mono-sm">RERA information</summary>
      <dl>
        {facts.map(([label, value]) => <div key={label}><dt className="mono-sm">{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <p className="pcard__source-note">
        {p.register
          ? `${p.source === 'MahaRERA' ? 'Registration, promoter and location: MahaRERA. Other details' : 'Details'}: Shri Sidhanath project register, updated ${p.register}. Completion dates are the timelines declared to RERA, not a guarantee. Ask us for current price and availability, and check the live record on MahaRERA.`
          : 'Source: MahaRERA. Full record details require CAPTCHA verification on MahaRERA.'}
      </p>
      {p.sourceUrl && <a className="pcard__source mono-sm" href={p.sourceUrl} target="_blank" rel="noreferrer">View on MahaRERA &nearr;</a>}
    </details>
  );
}
