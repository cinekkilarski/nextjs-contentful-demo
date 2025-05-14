import { createClient } from "contentful";
import { contentfulConfig } from "@/config";

const { spaceId, accessToken } = contentfulConfig;

// Check if we're in a test environment or missing required credentials
const isMissingCredentials = !spaceId || !accessToken;
const isTestEnvironment = process.env.NODE_ENV === "test";

// Create a real client or mock client depending on environment
const client =
  isMissingCredentials || isTestEnvironment
    ? createMockClient()
    : createClient({
        space: spaceId,
        accessToken,
      });

// Create a mock client for testing
function createMockClient() {
  return {
    getEntries: jest.fn().mockResolvedValue({
      items: [],
    }),
    getEntry: jest.fn().mockResolvedValue({
      fields: { title: "Mock Title", content: "Mock Content" },
    }),
  };
}

export default client;
