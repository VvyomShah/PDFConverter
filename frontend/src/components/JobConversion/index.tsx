// pages/JobConversion.tsx
import { FC, useState } from 'react';
import { ChooseFileStep } from '@/components/JobConversion/ChooseFileStep';
import { UploadFileStep } from '@/components/JobConversion/UploadFileStep';
import { JobStatusComponent } from '@/components/JobConversion/JobStatusComponent';
import { JobFinished } from '@/components/JobConversion/JobFinished';
import { api } from '@/api';
import { JobStatus } from '@/types';

const JobConversion: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [conversionStarted, setConversionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobComplete, setJobComplete] = useState(false);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);

  const onFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setJobId(null);
    setConversionStarted(false);
    setIsLoading(false);
    setJobComplete(false);
    setJobStatus(null);
  };

  const onCancel = () => {
    setFile(null);
    setJobId(null);
    setConversionStarted(false);
    setIsLoading(false);
    setJobComplete(false);
    setJobStatus(null);
  };

  const onComplete = (status: JobStatus) => {
    setConversionStarted(false);
    setJobComplete(true);
    setJobStatus(status);
  };

  const onConvert = async () => {
    if (file) {
      setIsLoading(true);
      try {
        const response = await api.convertToPDF(file);
        setJobId(response.id);
        setConversionStarted(true);
      } catch (error) {
        console.error('Conversion failed:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-xl">
      {!file && !jobId && <ChooseFileStep onFileUpload={onFileUpload} />}

      {file && !jobId && (
        <UploadFileStep
          filename={file.name}
          onCancel={onCancel}
          onConvert={onConvert}
        />
      )}

      {jobId && !jobComplete && (
        <>
          <JobStatusComponent jobId={jobId} onComplete={onComplete} onCancel={onCancel} onConvert={onConvert} />
        </>
      )}

      {jobComplete && jobStatus?.s3_url && (
        <JobFinished
          filename={file?.name || ''}
          downloadUrl={jobStatus.s3_url}
          onNewConversion={onCancel}
        />
      )}
    </div>
  );
};

export default JobConversion;