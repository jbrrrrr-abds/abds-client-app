<script lang="ts">
  import "../app.css";
  import { invalidate } from '$app/navigation'
  import type { Session } from "@supabase/supabase-js"
	import { onMount } from 'svelte'
  import { Header } from "$lib/components/Header";
  import { Footer } from "$lib/components/Footer";
	import type { SupabaseClient } from "@supabase/supabase-js";

  export let data: { supabase: SupabaseClient, session: Session }

  let { supabase, session } = data
	$: ({ supabase, session } = data)

  onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
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
