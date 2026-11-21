CREATE TABLE IF NOT EXISTS project_requests (
  id BIGSERIAL PRIMARY KEY,
  reference VARCHAR(32) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  service VARCHAR(120) NOT NULL,
  details TEXT NOT NULL,
  budget VARCHAR(80),
  timeline VARCHAR(80),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS project_requests_created_at_idx ON project_requests(created_at DESC);
