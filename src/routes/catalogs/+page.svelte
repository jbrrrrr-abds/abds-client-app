<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from "$lib/components/ui/button/index.js";
  import { FilePdfOutline } from 'flowbite-svelte-icons'

  type PrismicObject = {
    data?: any,
    designArchive?: any,
    prismicUser?: {
      companies: {
        name: string,
      },
      accountEmail: string,
      prismicSlug: string
    }
  }

  export let data: PageData
  const client: PrismicObject = data.data
  const catalogs: PrismicObject = data.data.catalogArchive

  console.log(catalogs.data);
</script>

<div class="w-full">
  <div class="w-full mb-6">
    <h1 class="mb-8 text-xxxl">
      {client.data.prismicUser ? client.data.prismicUser.companies.name + ' ' : ''}Catalog List
    </h1>
    <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {#each catalogs.data.catalog_unit as cat, i }
        <div class="p-4 mb-1 bg-white">
          <a href="{cat.pdf_upload.url}" target="_blank">
            <img
              class="max-w-full"
              src="{cat.thumbnail_image.url}"
              alt="{cat.thumbnail_image.alt}"
            >
          </a>
          <h4 class="pb-1 mt-4 text-sm font-bold text-left uppercase">
            <a href="{cat.pdf_upload.url}" target="_blank">
              <FilePdfOutline class="inline-block mr-[1px] top-1"/>
              { cat.catalog_name }
            </a>
          </h4>
        </div>
      {/each}
    </section>
  </div>
</div>


