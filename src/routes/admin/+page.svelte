<script lang="ts">
  import type { PageData } from './$types';
  import Time from "svelte-time";
  import {
    InstantSearch,
    SearchBox,
    Hits,
    Pagination,
    HitsPerPage,
  } from "svelte-algolia-instantsearch";
  import algoliasearch from "algoliasearch/lite";

  const searchClient = algoliasearch("<YOUR_API_KEY>", "<YOUR_SEARCH_KEY>");


  export let data: PageData
  const { recentSubmits } = data
</script>

<h1 class="mb-8 text-xxxl">ABDS Client Designs Admin</h1>

<div class="flex flex-row space-x-16">
  <section class="w-1/2">
    <h2 class="mb-3 text-lg font-bold normal-case font-GothamSSMed">Search</h2>
    <InstantSearch indexName="<YOUR_INDEX_NAME>" routing {searchClient}>
      <SearchBox />

      <div>
        <Hits let:hit>
          <img src={hit.author_image_url} alt={hit.author_name} />
          {hit.post_title} by {hit.author_name}
        </Hits>
      </div>

      <div class="flex w-full">
        <Pagination />
        <HitsPerPage
          items={[
            { value: 5, label: "Show 5 hits", default: true },
            { value: 10, label: "Show 10 hits" },
          ]}
        />
      </div>
    </InstantSearch>
  </section>

  <section class="w-1/2">
    <h2 class="mb-3 text-lg font-bold normal-case font-GothamSSMed">Recent Submissions</h2>
    <table class="w-full">
      <thead>
        <tr class="font-bold text-left text-md bg-brandBlack text-brandWhite">
          <th class="px-4 py-1 w-[1%] whitespace-nowrap text-center">ID</th>
          <th class="px-4 py-1 w-[1%] whitespace-nowrap">Date</th>
          <th class="px-4 py-1 w-[1%] whitespace-nowrap">Company</th>
          <th class="px-4 py-1">Email</th>
        </tr>
      </thead>

        <tbody class="text-sm">
          {#each recentSubmits.data as s}
            <tr class="transition-colors border-b cursor-pointer odd:bg-white even:bg-lightGray-50 text-brandBlack border-b-black-300 hover:bg-slate-200">
              <td class="px-4 py-2 my-1 w-[1%] whitespace-nowrap">
                <a href="./admin/entry/{s.id}" class="block">
                  <div class="block w-6 py-1 font-bold text-center text-white bg-gold">
                    {s.id}
                  </div>
                </a>
              </td>
              <td class="px-4 py-2 my-1 w-[1%] whitespace-nowrap">
                <a href="./admin/entry/{s.id}" class="block font-bold">
                  <Time format="YYYY/MM/DD @ h:mm A" timestamp="{s.created_at}" />
                </a>
              </td>
              <td class="px-4 py-2 my-1 w-[1%] whitespace-nowrap">
                <a href="./admin/entry/{s.id}" class="font-bold font-GothamSSBold">
                  {s.company}
                </a>
              </td>
              <td class="px-4 py-2 my-1">
                <a href="./admin/entry/{s.id}">
                  {s.sender_email}
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
    </table>
  </section>
</div>


