<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  export let data;

  onMount(() => {
    if (!data.session) {
      goto('./login')
    }
  })
</script>

<div>
  <h1>Welcome to the site</h1>
</div>
