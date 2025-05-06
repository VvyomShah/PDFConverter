// components/ProgressSpinner.tsx
export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-6 p-4">
      <div className="w-6 h-6 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
    </div>
  );
};