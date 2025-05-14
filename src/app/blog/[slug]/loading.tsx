export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back link placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 mb-8 animate-pulse"></div>

      <article className="max-w-4xl mx-auto">
        {/* Title placeholder */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8 animate-pulse"></div>

        {/* Image placeholder */}
        <div className="relative h-[400px] w-full mb-8 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-lg"></div>

        {/* Content placeholders */}
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/6"></div>
        </div>

        {/* Like button placeholder */}
        <div className="mt-8 h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
      </article>
    </div>
  );
}
