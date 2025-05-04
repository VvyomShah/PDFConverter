CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY, -- UUID-like
    filename TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'converting', 'completed', 'error')),
    error TEXT DEFAULT NULL,
    s3_url TEXT DEFAULT "",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);