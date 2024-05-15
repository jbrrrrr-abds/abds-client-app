<script lang="ts">
  import type { PageData } from './$types';
  import { DesignsGrid } from '$lib/components/DesignsGrid';

  type PrismicObject = {
    data?: any,
    designArchive?: any
  }

  const favorites = [];

  export let data: PageData;

  const client: PrismicObject = data.data
  //console.log(client.designArchive.data.design_unit);
</script>
<div class="grid grid-cols-6 gap-4">
  <div class="col-span-6">
    <DesignsGrid {client} />
  </div>
<!--
  <div class="col-span-2">

  </div>
  -->
</div>

