const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
});

module.exports = createJestConfig(config);
