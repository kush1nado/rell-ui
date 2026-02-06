import { defineConfig } from 'vite';
import { reactTypesPlugin } from './vite-plugin-react-types';

export default defineConfig({
  plugins: [reactTypesPlugin()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'RellUI',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'tokens/theme.css';
          }
          return assetInfo.name || 'asset';
        }
      }
    },
    copyPublicDir: false,
  }
});

