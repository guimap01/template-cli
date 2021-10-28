export default {
  testMatch: ['**/?(*.)+(test).[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/App.tsx',
    '!src/bootstrap.tsx',
    '!src/routes/index.tsx',
  ],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '^styled-components':
      '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
};
