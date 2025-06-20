export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <span className="text-lg font-semibold text-gray-700">Loading, please wait...</span>
      </div>
    </div>
  );
}
