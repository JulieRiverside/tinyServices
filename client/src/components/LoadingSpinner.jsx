// src/components/LoadingSpinner.jsx

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-gray-200"></div>
    </div>
  )
}
