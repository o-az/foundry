import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  shims: true,
  clean: true,
  bundle: true,
  outDir: 'dist',
  sourcemap: true,
  format: ['esm'],
  target: ['node22'], // LTS
  treeshake: 'recommended',
  entry: ['./src/index.ts'],
})
