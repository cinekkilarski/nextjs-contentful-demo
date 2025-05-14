export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        {/* Hero section skeleton */}
        <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md mb-6 animate-pulse"></div>
        <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded-md mb-8 animate-pulse"></div>
        <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </section>

      <section>
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700"
            >
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
