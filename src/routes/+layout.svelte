<script>
	import '../app.css';
	import { Header } from '$lib/components/Header/';
	import { Footer } from '$lib/components/Footer/';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex flex-col justify-between min-h-screen layout">
	<Header></Header>

	<main class="container flex-grow py-12">
		<slot></slot>
	</main>

	<Footer></Footer>
</div>
