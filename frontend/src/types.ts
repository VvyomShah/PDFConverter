// types.ts

export interface JobStatus {
  created_at: string;
  filename: string;
  job_id: string;
  s3_url: string;
  status: string;  // Example: "SUCCESS"
}
