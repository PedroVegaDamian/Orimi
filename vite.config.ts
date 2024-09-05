import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'

export default defineConfig({
	plugins: [react(), checker({ typescript: true })],
	resolve: {
		alias: {
			'@': '/src'
		}
	}
})
