import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': '/src'
    },
    include: ['__tests__/**/*.[jt]s?(x)'],
    exclude: ['__tests__/vitest-env.d.ts']
  }
})
