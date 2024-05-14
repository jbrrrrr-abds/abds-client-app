<script lang="ts">
  import type { PageData } from './$types';
  import MaterialSymbolsLightFavoriteOutline from '~icons/material-symbols-light/favorite-outline';

  type PrismicObject = {
    data?: any,
    designArchive?: any;
  }

  const designSelect = () => {

  }

  export let data: PageData;

  const client: PrismicObject = data.data
  //console.log(client.designArchive.data.design_unit);
</script>

<section class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
  {#each client.designArchive.data.design_unit as unit}
    <div class="relative border-2">
      <div>
        <img class="m-w-full" src={unit.design_artwork.url} alt={unit.design_name.text} />
      </div>
      <h3 class="py-2 font-bold text-center">{unit.design_name[0].text}</h3>
      <!-- favorite UI -->
      <button on:click={designSelect} class="absolute top-0 right-0 z-20 flex items-center w-8 h-8 p-1 text-center bg-white border-b border-l border-white cursor-pointer bg-opacity-15">
        <MaterialSymbolsLightFavoriteOutline class="text-transparent text-[2rem] z-30 opacity-50"/>
      </button>
    </div>
  {/each}
</section>
