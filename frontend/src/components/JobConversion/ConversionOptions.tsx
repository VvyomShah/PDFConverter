import { FC } from 'react';

export const ConversionOptions: FC = () => (
  <div className="flex flex-col mb-4 align-top">
    <div className="border border-gray-300 rounded-xl p-4 mt-2">
      <div className="flex items-center">
        <input
          checked
          id="default-radio-2"
          type="radio"
          name="conversion-type"
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          readOnly
        />
        <label htmlFor="default-radio-2" className="text-blue-500 ms-2 text-sm font-medium">
          Convert To PDF
        </label>
      </div>
      <label className="ms-6 text-sm font-medium text-blue-500">
        Best quality, retains images and other assets
      </label>
    </div>
  </div>
);
