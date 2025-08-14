import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
    include: ['src/**/*.test.ts'],
    globals: true,
    passWithNoTests: true,
    silent: false,
    reporters: ['basic', 'junit'],
    outputFile: {
      junit: './TestResult.xml'
    },
    coverage: {
      reporter: ['cobertura', 'text'],
      provider: 'istanbul',
    }
  }
})