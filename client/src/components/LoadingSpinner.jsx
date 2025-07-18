// src/components/LoadingSpinner.jsx

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-80">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-gray-200"></div>
    </div>
  );
}
