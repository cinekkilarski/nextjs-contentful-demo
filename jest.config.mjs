import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components$": "<rootDir>/src/components",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/lib$": "<rootDir>/src/lib",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

export default createJestConfig(customJestConfig);
