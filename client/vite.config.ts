import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [react(), tsconfigPaths(), svgr()],
		base: './',
		server: {
			host: 'localhost',
			https: {
				cert: 'localhost.pem',
				key: 'localhost-key.pem'
			},
			port: 3000,
		},
		resolve: {
			alias: {
				src: '/src',
			}
		},
		build: {
			sourcemap: mode === 'development', // only generate sourcemaps in dev mode
		}
	};
});
