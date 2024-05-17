<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  export let data;

  onMount(() => {
    setTimeout(() => {
      if (!data.session) {
        goto('./login')
      } else {
        goto('./designs')
      }
    }, 100)
  })


</script>

<div>
</div>
