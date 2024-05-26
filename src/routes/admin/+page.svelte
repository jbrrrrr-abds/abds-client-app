<script lang="ts">
  import type { PageData } from './$types';
  import Time from "svelte-time";

  export let data: PageData
  const { recentSubmits } = data
  console.log(recentSubmits.data)
</script>

<h1 class="mb-8 text-xxxl">ABDS Client Designs Admin</h1>

<section>
  <h2 class="mb-3 text-lg font-bold normal-case font-GothamSS">Recent Submissions</h2>
  <table class="min-w-[600px] max-w-[800px]">
    <thead>
      <tr class="font-bold text-left text-md bg-brandBlack text-brandWhite">
        <th class="px-3 py-1 w-[1%] whitespace-nowrap">ID</th>
        <th class="px-3 py-1 w-[1%] whitespace-nowrap">Date</th>
        <th class="px-3 py-1 w-[1%] whitespace-nowrap">Company</th>
        <th class="px-3 py-1">Email</th>
      </tr>
    </thead>
    {#each recentSubmits.data as s}
      <tbody class="text-md">
        <tr class="border-b odd:bg-white even:bg-brandWhite-300 text-brandBlack border-b-black-300">
          <td class="px-3 py-2 my-1 w-[1%] whitespace-nowrap">
            <a href="https://www.google.com" class="font-bold text-blue-600 underline">
              {s.id}
            </a>
          </td>
          <td class="px-3 py-2 my-1 w-[1%] whitespace-nowrap">
            <a href="https://www.google.com" class="font-bold text-blue-600 underline">
              <Time format="MMMM D, YYYY - h:mm A" timestamp="{s.created_at}" />
            </a>
          </td>
          <td class="px-3 py-2 my-1 w-[1%] whitespace-nowrap">
            <a href="https://www.google.com" class="font-bold text-blue-600 underline">
              {s.company}
            </a>
          </td>
          <td class="px-4 py-2 my-1">{s.sender_email}</td>
        </tr>
      </tbody>
    {/each}
  </table>
</section>


