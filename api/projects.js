import { neon } from '@neondatabase/serverless';

function db() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  return neon(process.env.DATABASE_URL);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { name, service, details, budget = 'Not decided', timeline = 'Flexible' } = req.body || {};
    if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120) return res.status(400).json({ error: 'Please enter a valid name.' });
    if (typeof service !== 'string' || service.length > 120 || !service.trim()) return res.status(400).json({ error: 'Please select a service.' });
    if (typeof details !== 'string' || details.trim().length < 5 || details.length > 5000) return res.status(400).json({ error: 'Project details are required (max 5000 characters).' });
    const ref = 'MM-' + Date.now().toString(36).toUpperCase();
    await db()`
      INSERT INTO project_requests (reference, name, service, details, budget, timeline)
      VALUES (${ref}, ${name.trim()}, ${service.trim()}, ${details.trim()}, ${String(budget).slice(0,80)}, ${String(timeline).slice(0,80)})
    `;
    return res.status(201).json({ ok: true, reference: ref });
  } catch (error) {
    console.error('Project request error:', error.message);
    return res.status(500).json({ error: 'Unable to save request right now.' });
  }
}
