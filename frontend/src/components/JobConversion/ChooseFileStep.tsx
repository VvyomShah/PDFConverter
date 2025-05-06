// components/ChooseFileStep.tsx
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@/icons/UploadIcon';
import { Button } from '../SharedUI/Button';  // Assuming you have a Button component
import { Card } from '../SharedUI/Card';

type ChooseFileStepProps = {
  onFileUpload: (file: File) => void;
};

export const ChooseFileStep: FC<ChooseFileStepProps> = ({ onFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    accept: {
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
  });

  return (
    <Card {...getRootProps()} className="group cursor-pointer border-dashed">
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-gray-100 p-2">
          <UploadIcon />
        </div>
        <p className="text-xs text-gray-600 text-center">Drag and drop a PowerPoint file to convert to PDF.</p>
        <Button variant="secondary" className="text-blue-600 w-1/2">Choose file</Button>
      </div>
    </Card>
  );
};