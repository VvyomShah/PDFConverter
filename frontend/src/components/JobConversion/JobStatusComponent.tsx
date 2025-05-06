import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../SharedUI/ProgressSpinner';
import { api } from '@/api';
import { JobStatus } from '@/types';
import { Card } from '../SharedUI/Card';
import { Button } from '../SharedUI/Button';

type JobStatusComponentProps = {
  jobId: string;
  onComplete: (status: JobStatus) => void;
  onCancel: () => void;
  onConvert: () => void;
};

export const JobStatusComponent: FC<JobStatusComponentProps> = ({
  jobId,
  onComplete,
  onCancel,
  onConvert,
}) => {
  const [refetchIntervalValue, setRefetchIntervalValue] = useState(3000);

  const {
    data,
    isLoading,
    isError,
  } = useQuery<JobStatus>({
    queryKey: ['jobStatus', jobId],
    queryFn: () => api.getStatus(jobId),
    refetchInterval: refetchIntervalValue,
  });

  useEffect(() => {
    if (data?.status === 'SUCCESS' || data?.status === 'FAILED') {
      setRefetchIntervalValue(0);
      onComplete(data);
    }
  }, [data, onComplete]);

  // Still loading first fetch
  if (isLoading || !data) {
    return (
      <Card>
        <div className="p-4 text-center">
          <Spinner/>
          <p className="text-sm text-blue-500 mt-2">Checking job status...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <p className="text-sm text-center border border-gray-300 rounded-xl p-4">{data.filename}</p>

      <div className="flex items-center gap-2 border border-gray-300 rounded-xl mt-2 min-h-0">
        <Spinner/>
        <span className="text-sm text-blue-500">Processing your file...</span>
      </div>

      <div className="mt-4 flex justify-start gap-4">
        <Button variant="secondary" onClick={onCancel} disabled className='opacity-25'>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConvert} disabled className="text-white opacity-25">
          Convert
        </Button>
      </div>
    </Card>
  );
};