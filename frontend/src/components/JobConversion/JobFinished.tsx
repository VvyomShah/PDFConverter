// components/JobConversion/JobFinished.tsx
import { FC } from 'react';
import { Button } from '../SharedUI/Button';
import { Card } from '../SharedUI/Card';
import { CheckCircle2 } from 'lucide-react';

type JobFinishedProps = {
  filename: string;
  downloadUrl: string;
  onNewConversion: () => void;
};

export const JobFinished: FC<JobFinishedProps> = ({ filename, downloadUrl, onNewConversion }) => {
  return (
    <Card className="flex flex-col items-center text-center p-6">
      <CheckCircle2 className="text-green-500 w-10 h-10 mb-4" />
      <h2 className="text-lg font-semibold mb-2">Conversion Complete</h2>
      <p className="text-sm text-gray-600 mb-4">{filename}</p>

      <div className="flex w-full gap-4 justify-center">
        <a href={downloadUrl} download className="w-full">
          <Button variant="primary" className="w-full text-white">
            Download PDF
          </Button>
        </a>

        <Button variant="secondary" className="w-full" onClick={onNewConversion}>
          Convert Another File
        </Button>
      </div>
    </Card>
  );
};
