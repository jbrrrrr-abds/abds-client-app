<script lang="ts">
  import MaterialSymbolsLightFavoriteOutline from '~icons/material-symbols-light/favorite-outline';
  import MaterialSymbolsLightFavorite from '~icons/material-symbols-light/favorite';
  import { Button } from "$lib/components/ui/button/index.js";
  import { selectedDesigns } from '$lib/stores/selectedDesigns'

  export let client;

  const selectUnit = (unit: any ) => {
    const name = unit.design_name[0].text;
    if (unit.selected == true) {
      unit.selected = false;
      $selectedDesigns = $selectedDesigns.filter(d => d.name != name);
    } else {
      unit.selected = true;
      const newSelection = {
        name: name,
        unit: unit
      }
      $selectedDesigns = [...$selectedDesigns, newSelection]
    }
  }
</script>
<section class="grid grid-cols-2 gap-8 md:grid-cols-3">
  {#each client.designArchive.data.design_unit as unit, i}
    <div class="relative rounded-t-xl design-card border-3 ease-in-out overflow-clip drop-shadow-lg border-collapse group/card border mb-4 transition-all duration-1000 {unit.selected ? 'border-white shadow-black-300' : 'border-transparent shadow-black-200 drop-shadow-sm'}">
      <!-- Image Container -->
      <div class="object-cover overflow-hidden cursor-pointer">
        <img class="transition duration-1000 transform m-w-full ease-in-out group-hover/card:scale-[101%]" src={unit.design_artwork.url} alt={unit.design_name.text} />
      </div>
      <div class="flex flex-row justify-center p-3 font-black bg-white border-t font-GothamSS border-brandBlack-100 text-brandBlack">
      <!-- Button UI for Zoom/Select
          <Button variant="outline" class="h-auto px-2 py-[2px] text-xs font-bold uppercase rounded-full">
            <MaterialSymbolsLightZoomInRounded class="text-lg text-brandBlack"/>
            Zoom
          </Button>
        -->
        <Button variant="outline" class="h-auto border-brandBlack-100 px-3 py-2 border font-bold uppercase transition-colors ease-in-out rounded-full text-xs font-weight-bold group/button {unit.selected ? 'bg-gold-100 text-white hover:bg-gold hover:text-white' : 'bg-white'}" on:click={() =>selectUnit(unit)}>
          {unit.selected ? 'Selected': 'Select'}
        </Button>
      </div>
      <!-- Favorite UI Top Indicator -->
      <button
        class="absolute top-2 right-2 z-20 flex items-center w-6 h-6 p-[3px] duration:1000 ease-in-out text-center bg-white cursor-pointer border-brandBlack-100 rounded-full transition duration:500 {unit.selected? 'opacity-100': 'opacity-0'}">
        <MaterialSymbolsLightFavorite class="text-[40px] z-30 top-[1px] text-red-500 relative"/>
      </button>
    </div>
  {/each}
</section>