-- Create the database
CREATE DATABASE ppt_to_pdf;

-- Use the database
USE ppt_to_pdf;

-- Create the jobs table
CREATE TABLE jobs (
    id UUID PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    status ENUM('pending', 'converting', 'completed', 'error') NOT NULL DEFAULT 'pending',
    error TEXT,
    s3_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);