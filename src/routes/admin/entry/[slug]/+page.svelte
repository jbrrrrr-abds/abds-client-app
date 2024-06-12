<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  let entry: any;
  if (data.entry && data.entry.data) {
    entry = data.entry.data[0];
  }
</script>

<h1 class="text-xxl">Client Design Archive Submission</h1>
    {#if entry.data}
    <section>
      <h2 class="text-lg font-GothamBold">Client Info</h2>
      <pre>{JSON.stringify(entry.data[0])}</pre>
      <p class="text-sm">
        Entry ID: {entry.data.id}
      </p>
    </section>
  {/if}