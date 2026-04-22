import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,                      // Permite usar describe/it/expect sin imports
    environment: 'node',                // Entorno de ejecución Node.js (sin DOM)
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
