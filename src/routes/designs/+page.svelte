<script lang="ts">
  import type { PageData } from './$types';
  import { DesignsGrid } from '$lib/components/DesignsGrid';
  import { Button } from "$lib/components/ui/button/index.js";
  import { selectedDesigns } from '$lib/stores/selectedDesigns'
  import CarbonCloseFilled from '~icons/carbon/close-filled';

  type PrismicObject = {
    data?: any,
  }

  export let data: PageData;

  const client: PrismicObject = data.data
</script>
<div class="w-full">
  <div class="w-full lg:w-[calc(100vw-450px)] mb-6">
    <h1 class="mb-4 text-xxxl">Design Archive</h1>
    <p class="text-brandBlack">Select designs from your archive of previous styles.  We'll include them in your future product orders.</p>
  </div>
  <div class="flex flex-row">
    <div class="lg:w-[calc(100vw-450px)]">
      <DesignsGrid {client} />
    </div>
    <div class="w-[450px] ml-[50px] lg:block">
      <div class="sticky flex flex-col justify-between w-full top-4">
        <div class="w-full px-4 py-2 bg-white top-2">
          <div class="text-sm text-brandBlack-500">
            <h2 class="py-2 text-xl text-left uppercase text-brandBlack">Your Selections</h2>
            <div class="grid grid-cols-5 gap-4 my-2">
              {#each $selectedDesigns as d, i}
                <div class="relative col-span-1">
                  <img src="{d.unit?.design_artwork.url}" alt="d.unit?.design_name.text">
                  <div class="absolute opacity-90 inline text-sm text-white top-[-4px] right-[-4px] bg-black rounded-full">
                    <CarbonCloseFilled class=""/>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          <div class="flex flex-col p-2 pt-4 mt-2 border-t border-brandBlack-100 content-flex-end">
              <Button class="px-4 py-2 m-0 text-xl tracking-wide text-white uppercase rounded-none bg-gold font-Anton" disabled={$selectedDesigns.length == 0}>
                {$selectedDesigns.length == 0 ? 'None Selected' : 'Continue'}
              </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

