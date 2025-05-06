import { FC, useState } from 'react';
import { ChooseFileStep } from '@/components/JobConversion/ChooseFileStep';
import { FileConversionStep } from '@/components/JobConversion/FileConversionStep'; // NEW unified component
import { JobFinished } from '@/components/JobConversion/JobFinished';
import { api } from '@/api';
import { JobStatus } from '@/types';

const JobConversion: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobComplete, setJobComplete] = useState(false);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);

  const onFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setJobId(null);
    setJobComplete(false);
    setJobStatus(null);
  };

  const onCancel = () => {
    setFile(null);
    setJobId(null);
    setJobComplete(false);
    setJobStatus(null);
  };

  const onComplete = (status: JobStatus) => {
    setJobComplete(true);
    setJobStatus(status);
  };

  const onConvert = async () => {
    if (file) {
      try {
        const response = await api.convertToPDF(file);
        setJobId(response.id);
      } catch (error) {
        console.error('Conversion failed:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-xl">
      {!file && !jobId && <ChooseFileStep onFileUpload={onFileUpload} />}

      {file && !jobComplete && (
        <FileConversionStep
          filename={file.name}
          jobId={jobId}
          onCancel={onCancel}
          onConvert={onConvert}
          onComplete={onComplete}
        />
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