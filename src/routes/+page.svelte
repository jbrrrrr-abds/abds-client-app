<script lang="ts">
  import { redirect } from '@sveltejs/kit'

  export let data;

  if (!data.session) {
    redirect(302, './login')
  }
</script>