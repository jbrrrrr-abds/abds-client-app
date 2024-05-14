<script lang="ts">
  import type { PageData } from './$types';
  type PrismicObject = {
    data?: any,
    designArchive?: any;
  }

  export let data: PageData;

  const client: PrismicObject = data.data
  //console.log(client.designArchive.data.design_unit);
</script>

<section class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
  {#each client.designArchive.data.design_unit as unit}
    <div>
      <div>
        <img class="m-w-full" src={unit.design_artwork.url} alt={unit.design_name.text} />
      </div>
      <h3 class="py-2 font-bold text-center">{unit.design_name[0].text}</h3>
    </div>
  {/each}
</section>
