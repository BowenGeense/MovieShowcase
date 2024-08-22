import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		apiBaseURL: 'https://api4.thetvdb.com/v4/',
	}
});

export default app;