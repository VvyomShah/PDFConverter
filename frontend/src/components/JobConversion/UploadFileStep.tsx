import { FC } from 'react';
import { Button } from '../SharedUI/Button';
import { Card } from '../SharedUI/Card';

type UploadFileStepProps = {
  filename: string;
  onCancel: () => void;
  onConvert: () => void;
};

export const UploadFileStep: FC<UploadFileStepProps> = ({
  filename,
  onCancel,
  onConvert,
}) => {
  return (
    <Card className=''>
      {/* <h3 className="text-lg font-semibold">File Upload Complete</h3> */}
      <p className="text-sm text-center border border-gray-300 rounded-xl p-4">{filename}</p>
      <div className="flex flex-col mb-4 align-top">
        <div className='border border-gray-300 rounded-xl p-4 mt-2'>
        <div className="flex items-center">
          <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="default-radio-2" className="text-blue-500 ms-2 text-sm font-medium">Convert To PDF</label>
        </div>
        <label className="ms-2 text-sm font-medium text-blue-500">Best quality, retains images and other assets</label>
        </div>
      </div>
      <div className="mt-4 flex justify-start gap-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConvert} className='text-white'>
          Convert
        </Button>
      </div>
    </Card>
  );
};
