import App from '../src/routes/+page.svelte';
import { config } from 'dotenv';

config();

const app = new App({
	target: document.body,

});

export default app;