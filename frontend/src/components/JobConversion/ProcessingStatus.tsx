import { FC } from 'react';
import { Spinner } from '../SharedUI/ProgressSpinner';

export const ProcessingStatus: FC = () => (
  <div className="flex items-center gap-2 border border-gray-300 rounded-xl mt-2 min-h-0 p-4">
    <Spinner />
    <span className="text-sm text-blue-500">Processing your file...</span>
  </div>
);
