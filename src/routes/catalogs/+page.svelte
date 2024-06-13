<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from "$lib/components/ui/button/index.js";

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

</script>

<div class="w-full">
  <div class="w-full lg:w-[calc(100vw-450px)] mb-6">
    <h1 class="mb-4 text-xxxl">
      {client.data.prismicUser ? client.data.prismicUser.companies.name + ' ' : ''}Catalog List
    </h1>
  </div>
</div>


