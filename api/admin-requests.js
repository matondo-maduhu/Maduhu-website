import { neon } from '@neondatabase/serverless';
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const expected = process.env.ADMIN_KEY;
  const provided = req.headers['x-admin-key'];
  if (!expected || !provided || provided !== expected) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT reference, name, service, details, budget, timeline, created_at FROM project_requests ORDER BY created_at DESC LIMIT 200`;
    res.status(200).json(rows);
  } catch (e) {
    console.error('Admin requests error:', e.message);
    res.status(500).json({ error: 'Could not load requests' });
  }
}
