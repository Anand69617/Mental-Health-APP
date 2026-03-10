/*import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: false,
} satisfies Config;*/
import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite'; // <-- 1. Add this import

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: ['/*?'], 
	presets: [vercelPreset()] // <-- 2. Add the preset here
} satisfies Config;