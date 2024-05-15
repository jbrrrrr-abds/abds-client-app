<script lang="ts">
  import MaterialSymbolsLightFavoriteOutline from '~icons/material-symbols-light/favorite-outline';
  import MaterialSymbolsLightFavorite from '~icons/material-symbols-light/favorite';
  //import MaterialSymbolsLightZoomInRounded from '~icons/material-symbols-light/zoom-in-rounded';
  import { Button } from "$lib/components/ui/button/index.js";
  import { selectedDesigns } from '$lib/stores/selectedDesigns'

  export let client;

  const selectUnit = (unit: any) => {
    unit.selected = true;
    $selectedDesigns.push(unit.designName.text);
  }

  const deselectUnit = (unit: any) => {
    unit.selected = false;
    const index = $selectedDesigns.findIndex((i) => {
      return i.design_name.text == unit.design_name.text;
    })
    $selectedDesigns.splice(index, 1)
  }
</script>

<section class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
  {#each client.designArchive.data.design_unit as unit}
    <div class="relative rounded-t-xl design-card border-3 ease-in-out overflow-clip drop-shadow-lg border-collapse group/card border mb-4 transition-all duration-1000 {unit.selected ? 'border-white shadow-black-300' : 'border-transparent shadow-black-200 drop-shadow-sm'}">
      <!-- Image Container -->
      <div class="object-cover overflow-hidden cursor-pointer">
        <img class="transition duration-1000 transform m-w-full ease-in-out group-hover/card:scale-[101%]" src={unit.design_artwork.url} alt={unit.design_name.text} />
      </div>
      <div class="flex flex-row justify-center p-3 bg-white border-t border-brandBlack-100">
      <!-- Button UI for Zoom/Select
          <Button variant="outline" class="h-auto px-2 py-[2px] text-xs font-bold uppercase rounded-full">
            <MaterialSymbolsLightZoomInRounded class="text-lg text-brandBlack"/>
            Zoom
          </Button>
        -->
        {#if !unit.selected}
          <Button variant="outline" class="h-auto px-3 py-2 text-xs font-bold uppercase transition-colors ease-in-out rounded-full Anton group/button" on:click={() => (unit.selected = !unit.selected)}>
            Select Design
          </Button>
        {:else}
          <Button variant="outline" class="h-auto px-3 py-2 text-xs font-bold text-white uppercase transition-colors ease-in-out rounded-full border-1-gold bg-gold Anton group/button hover:bg-gold" on:click={() => deselectUnit(unit)}>
            SELECTED
          </Button>
        {/if}
      </div>
      <!-- Favorite UI Top Indicator -->
      <button
        class="absolute top-2 right-2 z-20 flex items-center w-6 h-6 p-[3px] duration:1000 ease-in-out text-center bg-white cursor-pointer border-brandBlack-100 rounded-full transition duration:500 {unit.selected? 'opacity-100': 'opacity-0'}">
        <MaterialSymbolsLightFavorite class="text-[40px] z-30 text-red-500"/>
      </button>
    </div>
  {/each}
</section>