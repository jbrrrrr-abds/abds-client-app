<script lang="ts">
  import type { PageData } from './$types';
  import { DesignsGrid } from '$lib/components/DesignsGrid';
  import { Button } from "$lib/components/ui/button/index.js";
  import { selectedDesigns } from '$lib/stores/selectedDesigns'
  import CarbonCloseFilled from '~icons/carbon/close-filled';
  import { Drawer, Button as CloseButton, Input, Label, InputAddon, ButtonGroup, Textarea } from 'flowbite-svelte'
  import { sineIn } from 'svelte/easing';
  import type { ButtonType } from 'flowbite-svelte'
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
  import type { ActionResult } from '@sveltejs/kit'

  type PrismicObject = {
    data?: any,
    designArchive?: any
  }

  export let data: PageData
  const client: PrismicObject = data.data

  const removeDesign = async (index: number) => {
    const targetDesign = $selectedDesigns[index];
    if (targetDesign && targetDesign.unit) targetDesign.unit.selected = false;
    $selectedDesigns = $selectedDesigns.filter((_: any, i: number) => i !== index);
  }

  // mobile panel
  let hiddenBackdropTrue = true;
  let transitionParamsRight = {
    x: 360,
    duration: 300,
    easing: sineIn
  };

  const sendRequest = async (event: { currentTarget: EventTarget & HTMLFormElement}) => {
    const data = new FormData(event.currentTarget)
    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: data
    })

    const result: ActionResult = deserialize(await response.text())

    if (result.type === 'success') {
      await invalidateAll();
    }

    applyAction(result);
  }

  export let submitBtn: ButtonType = 'submit'
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
            <h2 class="pt-2 pb-1 text-xl text-left uppercase text-brandBlack">Your Selections</h2>
            <div class="grid grid-cols-5 gap-4 my-4">
              {#each $selectedDesigns as d, i}
                <button class="relative col-span-1 border cursor-pointer bg-black-200" on:click={() => removeDesign(i)}>
                  <img src="{d.unit?.design_artwork.url}" alt="d.unit?.design_name.text">
                  <div class="absolute inline text-sm text-white top-[-4px] right-[-4px] bg-black rounded-full">
                    <CarbonCloseFilled class=""/>
                  </div>
                </button>
              {/each}
            </div>
          </div>
          <div class="flex flex-col p-2 pt-4 mt-2 border-t border-brandBlack-100 content-flex-end">
              <Button class="px-4 py-2 m-0 text-xl tracking-wide text-white uppercase rounded-none bg-gold font-Anton" on:click={() => (hiddenBackdropTrue = false)} disabled={$selectedDesigns.length == 0}>
                {$selectedDesigns.length == 0 ? 'None Selected' : 'Continue'}
              </Button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Submission sidebar panel -->
  <Drawer backdrop={true} placement="right" transitionType="fly" class="p-0 text-white shadow-lg bg-brandBlack shadow-black" transitionParams={transitionParamsRight} bind:hidden={hiddenBackdropTrue} id="submitPanel">
  <form method="POST" on:submit|preventDefault={sendRequest}>
    <input type="hidden" name="selectedDesigns" bind:value={$selectedDesigns}/>
    <div class="relative flex flex-col justify-between min-h-screen">
      <div class="mt-6">
        <CloseButton on:click={() => (hiddenBackdropTrue = true)} class="absolute mb-4 right-1 top-1 text-brandWhite" />
        <h5 id="drawer-label" class="px-6 mt-6 mb-8 tracking-wide text-white uppercase text-xxxl font-Anton">Send It In!</h5>
        <p class="px-6 mb-6 text-sm text-white">
          Please enter your name and email address, as well as any notes you'd like to include.
        </p>
      </div>
      <div class="px-6 grow">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-xs font-black uppercase">Name</label>
          <Input type="text" class="p-2 my-1 placeholder-gray-400" id="name" name="name" placeholder="enter your name" />
        </div>

        <div class="mb-6">
          <label for="Email" class="block mb-2 text-xs font-black uppercase">Email</label>
          <Input type="email" id="email" class="p-2 my-1 placeholder-gray-400" name="email" placeholder="email@company.com" required/>
        </div>

        <div class="mb-6">
          <label for="notes" class="block mb-2 text-xs font-black uppercase">Notes</label>
          <Textarea id="notes" name="notes" class="p-2 placeholder-gray-400" rows="4" placeholder="any additional notes or comments" />
        </div>
      </div>

      <div class="px-6 py-4 mt-8">
        <Button class="w-full px-2 py-8 text-white uppercase rounded-none bg-gold font-Anton text-xxl hover:bg-black hover:text-white" type={submitBtn}>Submit</Button>
      </div>
      </div>
    </form>
  </Drawer>
</div>

