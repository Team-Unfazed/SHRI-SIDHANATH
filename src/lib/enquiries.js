// Publishable keys are intended for browser use. Database permissions protect records.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://aimiaugyokllclljabwh.supabase.co';
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_GQVyrV1sjvX8Vj6VRjRDEA_yXRoNuY6';

export async function saveEnquiry(enquiry) {
  const response = await fetch(`${url}/rest/v1/website_enquiries`, {
    method: 'POST',
    headers: {
      apikey: key,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(enquiry),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Enquiry submission failed');
}
