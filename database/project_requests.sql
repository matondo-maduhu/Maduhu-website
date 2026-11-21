-- Create the missing table used by /api/admin-requests
-- Run this migration against the Neon database used by maduhu-website.

CREATE TABLE IF NOT EXISTS project_requests (
    id BIGSERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    service TEXT,
    description TEXT,
    budget TEXT,
    start_date TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Index for the admin dashboard's newest-first request list.
CREATE INDEX IF NOT EXISTS project_requests_created_at_idx
    ON project_requests (created_at DESC);
