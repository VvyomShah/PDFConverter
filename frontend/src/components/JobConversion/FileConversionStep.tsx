import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { JobStatus } from '@/types';
import { Card } from '../SharedUI/Card';
import { ProcessingStatus } from './ProcessingStatus';
import { ConversionOptions } from './ConversionOptions';
import { ActionButtons } from './ActionButtons';

type FileConversionStepProps = {
  jobId?: string | null;
  filename: string;
  onCancel: () => void;
  onConvert: () => void;
  onComplete?: (status: JobStatus) => void;
};

export const FileConversionStep: FC<FileConversionStepProps> = ({
  jobId,
  filename,
  onCancel,
  onConvert,
  onComplete,
}) => {
  const [refetchIntervalValue, setRefetchIntervalValue] = useState(3000);

  const { data } = useQuery<JobStatus>({
    queryKey: ['jobStatus', jobId],
    queryFn: () => api.getStatus(jobId!),
    refetchInterval: jobId ? refetchIntervalValue : false,
    enabled: !!jobId,
  });

  useEffect(() => {
    if (data?.status === 'SUCCESS' || data?.status === 'FAILED') {
      setRefetchIntervalValue(0);
      onComplete?.(data);
    }
  }, [data, onComplete]);

  const isProcessing = !!jobId;

  return (
    <Card>
      <p className="text-sm text-center border border-gray-300 rounded-xl p-4">{filename}</p>
      {isProcessing ? <ProcessingStatus /> : <ConversionOptions />}
      <ActionButtons
        primaryLabel="Convert"
        onPrimaryClick={onConvert}
        disablePrimary={isProcessing}
        secondaryLabel="Cancel"
        onSecondaryClick={onCancel}
        disableSecondary={isProcessing}
      />
    </Card>
  );
};