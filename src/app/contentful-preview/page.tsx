import client from "@/lib/contentful";
import Link from "next/link";

export default async function ContentfulPreviewPage() {
  let status;

  try {
    // We can't use getSpace directly with the delivery client
    // Let's try to get a single entry instead
    const entries = await client.getEntries({
      limit: 1,
    });

    status = {
      connected: true,
      entriesCount: entries.total,
      spaceId: process.env.CONTENTFUL_SPACE_ID || "Not configured",
    };
  } catch (error) {
    console.error("Error connecting to Contentful:", error);
    status = {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contentful Integration Status</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>

        {status.connected ? (
          <div className="text-green-600 font-medium">
            ✅ Connected to Contentful
            <p className="mt-2 text-sm text-gray-700">
              Space ID: {status.spaceId}
              <br />
              Total entries: {status.entriesCount}
            </p>
          </div>
        ) : (
          <div className="text-red-600 font-medium">
            ❌ Not connected to Contentful
            <p className="mt-2 text-sm text-gray-700">Error: {status.error}</p>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>

        <ol className="list-decimal list-inside space-y-3">
          <li>
            Create a{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code>{" "}
            file in the project root
          </li>
          <li>
            Add your Contentful credentials:
            <pre className="bg-gray-100 p-3 mt-2 rounded overflow-auto text-sm">
              CONTENTFUL_SPACE_ID=your_space_id_here
              <br />
              CONTENTFUL_ACCESS_TOKEN=your_access_token_here
            </pre>
          </li>
          <li>Restart your development server</li>
          <li>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Visit the blog page
            </Link>{" "}
            to see your content
          </li>
        </ol>
      </div>
    </div>
  );
}
