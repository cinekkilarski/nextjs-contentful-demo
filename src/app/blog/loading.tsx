export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Generate 6 loading skeletons */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden shadow-sm animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>

            {/* Title placeholder */}
            <div className="p-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
