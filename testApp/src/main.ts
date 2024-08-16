import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'mars',
		test: 'universe'
	}
});

export default app;