import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log('command', command)
  if (command === 'doc' || command === 'serve') {
    return {
      plugins: [react()]
    }
  } else if (command === 'build') {
    return {
      plugins: [react()],
      build: {
        outDir: 'lib',
        rollupOptions: {
          // 请确保外部化那些你的库中不需要的依赖
          external: ['react', 'san', 'react-dom/client']
        },
        lib: {
          entry: resolve(__dirname, './src/lib/index.tsx'),
          name: 'seact',
          fileName: 'seact'
        }
      }
    }
  }
})
