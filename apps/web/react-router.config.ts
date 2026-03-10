/*import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: false,
} satisfies Config;*/
import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: false, // Keep this false!
	presets: [vercelPreset()]
} satisfies Config;