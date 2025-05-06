import { FC } from 'react';
import { Card } from '../SharedUI/Card';
import { CheckCircle2 } from 'lucide-react';
import { ActionButtons } from './ActionButtons';

type JobFinishedProps = {
  filename: string;
  downloadUrl: string;
  onNewConversion: () => void;
};

export const JobFinished: FC<JobFinishedProps> = ({
  filename,
  downloadUrl,
  onNewConversion,
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename.replace(/\.[^/.]+$/, '.pdf');
    link.click();
  };

  return (
    <Card className="flex flex-col text-center">
      <div className='border justify-items-center border-gray-300 rounded-xl p-6'>
          <CheckCircle2 className="text-green-500 w-20 h-20" />
          <h2 className="text-lg font-semibold">File converted successfully!</h2>
      </div>

      <ActionButtons
        primaryLabel="Download PDF"
        onPrimaryClick={handleDownload}
        secondaryLabel="Convert Another File"
        onSecondaryClick={onNewConversion}
      />
    </Card>
  );
};
