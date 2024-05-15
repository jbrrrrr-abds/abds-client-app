<script lang="ts">
  import type { PageData } from './$types';
  import { DesignsGrid } from '$lib/components/DesignsGrid';
  import { Button } from "$lib/components/ui/button/index.js";
  import { selectedDesigns } from '$lib/stores/selectedDesigns'


  type PrismicObject = {
    data?: any,
    designArchive?: any
  }

  const favorites = [];

  export let data: PageData;

  const client: PrismicObject = data.data
</script>
<div class="grid grid-cols-6 gap-4">
  <div class="col-span-6 lg:col-span-4">
    <DesignsGrid {client} />
  </div>
  <div class="col-span-2 ml-8 display-none lg:display-block">
    <div class="flex flex-col justify-between px-4 py-2 bg-white">
      <div class="text-sm text-brandBlack-500">
        <h2 class="py-2 text-xl text-left uppercase text-brandBlack">Selected Designs</h2>
        <p>
          Select designs from your archive of previous design styles.  We'll include them in your future product orders.
        </p>
      </div>
      <div class="p-2 mt-4 border-t border-brandBlack-100">

      </div>
    </div>
  </div>
</div>

