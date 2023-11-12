import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const isProduction = mode === 'production'

    return {
      ...defineConfig,
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: isProduction ? 'foodwise-server.up.railway.app' : 'http://localhost:3001'
          },
          '/auth': {
            target: isProduction ? 'foodwise-server.up.railway.app' : 'http://localhost:3001'
          }
        }
      }
    }
  } else {
    return {
      ...defineConfig,
      plugins: [react()]
    }
  }
})
