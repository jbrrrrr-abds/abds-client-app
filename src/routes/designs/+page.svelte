<script lang="ts">
  import type { PageData } from './$types';
  import { DesignsGrid } from '$lib/components/DesignsGrid';
  import { Button } from "$lib/components/ui/button/index.js";
  import { selectedDesigns } from '$lib/stores/selectedDesigns'
  import { modalState } from '$lib/stores/modalState'
  import CarbonCloseFilled from '~icons/carbon/close-filled';
  import BitcoinIconsAlertCircleFilled from '~icons/bitcoin-icons/alert-circle-filled';
  import EpSuccessFilled from '~icons/ep/success-filled';
  import { enhance } from '$app/forms';
  import { Drawer, Button as CloseButton, Input, Label, Textarea, Modal } from 'flowbite-svelte'
  import { sineIn } from 'svelte/easing';
  import type { ButtonType } from 'flowbite-svelte'

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
  $: stringifiedSelects = JSON.stringify($selectedDesigns)

  let targetDesign: any = {
    obj: null,
    index: null
  }

  const findDesignToRemove = async (index: number) => {
    targetDesign.index = index;
    targetDesign.obj = $selectedDesigns[index];
    $modalState.deleteModal = true
  }

  const removeDesign = async () => {
    if (targetDesign.obj && targetDesign.obj.unit) targetDesign.obj.unit.selected = false;
    $selectedDesigns = $selectedDesigns.filter((_: any, i: number) => i !== targetDesign.index);
  }

  // mobile panel
  let hiddenBackdropTrue = true;
  let transitionParamsRight = {
    x: 360,
    duration: 300,
    easing: sineIn
  };

  const resetSelections = () => {
    $selectedDesigns = [];
    client.designArchive.data.design_unit.forEach((d: any) => {
      d.selected = false
    })
  }

  export let submitBtn: ButtonType = 'submit'
</script>

<div class="w-full">
  <div class="w-full lg:w-[calc(100vw-450px)] mb-6">
    <h1 class="mb-4 text-xxxl">
      {client.data.prismicUser ? client.data.prismicUser.companies.name + ' ' : ''}Design Archive
    </h1>
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
              <!-- on:click={() => removeDesign(i)} -->
                <button class="relative col-span-1 border cursor-pointer bg-black-200" on:click={() => findDesignToRemove(i)}>
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
  <form method="POST" action="?/submit" use:enhance={() => {
    return async ({ result }) => {
      console.log(result)
      if (result.status === 204) {
        $modalState.successModal = true
        hiddenBackdropTrue = true
        resetSelections();
      } else {
        $modalState.errorModal = true
        hiddenBackdropTrue = true
      }
    }
  }}>
    <input type="hidden" name="selectedDesigns" bind:value={stringifiedSelects}/>
    <input type="hidden" name="company" bind:value={client.data.prismicUser.company}>
    <input type="hidden" name="accountEmail" bind:value={client.data.session.user.email} />
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
          <Label for="name" class="block mb-1 text-xs font-black text-white uppercase opacity-60">Name</Label>
          <Input type="text" class="p-2 my-1 placeholder-gray-400" id="name" name="name" placeholder="enter your name" />
        </div>

        <div class="mb-6">
          <Label for="Email" class="block mb-1 text-xs font-black text-white uppercase opacity-60">Email</Label>
          <Input type="email" id="email" class="p-2 my-1 placeholder-gray-400" name="email" placeholder="email@company.com" required/>
        </div>

        <div class="mb-6">
          <Label for="notes" class="block mb-1 text-xs font-black text-white uppercase opacity-60">Notes</Label>
          <Textarea id="notes" name="notes" class="p-2 placeholder-gray-400" rows="4" placeholder="any additional notes or comments" />
        </div>
      </div>

      <div class="px-6 py-4 mt-8">
        <Button class="w-full px-2 py-8 text-white uppercase rounded-none bg-gold font-Anton text-xxl hover:bg-gold-100 hover:text-white" type={submitBtn}>Submit</Button>
      </div>
      </div>
    </form>
  </Drawer>

  <!-- don't render until store values are set-->
  <!-- Modal to confirm removing item from selected list -->
  <Modal bind:open={$modalState.deleteModal} size="xs" autoclose dismissable={false} class="text-white rounded-none shadow-lg x-cloak text-md bg-brandBlack shadow-black/50n">
    <h2 class="pb-4 text-center text-xxl">
      <BitcoinIconsAlertCircleFilled class="inline top-[-2px] relative" />
      Remove this design?
    </h2>
    <div class="flex flex-row justify-center w-full space-x-5">
      <Button variant="outline" class="w-1/4 text-sm font-bold text-white uppercase transition bg-transparent rounded-none hover:bg-gold-100">
        Cancel
      </Button>

      <Button class="w-1/4 text-sm font-bold text-white uppercase transition rounded-none bg-gold hover:bg-gold-900" on:click={() => removeDesign()}>
        Yes
      </Button>
    </div>
  </Modal>

  <!-- Modal to on error in submission -->
  <Modal bind:open={$modalState.errorModal} size="xs" autoclose dismissable={false} outsideclose class="text-white rounded-none shadow-lg x-cloak text-md bg-brandBlack shadow-black/50n">
    <h2 class="text-xxl">
      <BitcoinIconsAlertCircleFilled class="inline top-[-2px] relative" />
      Something went wrong
    </h2>
    <p>An error occurred while sending your selected designs to the server.  Please try again.</p>
    <div class="flex flex-row justify-end w-full">
      <Button class="w-1/3 text-sm font-bold text-white uppercase transition rounded-none wfull-1 bg-gold hover:bg-gold-900">
        OK
      </Button>
    </div>
  </Modal>

  <!-- Modal on successful submission-->
  <Modal bind:open={$modalState.successModal} autoclose outsideclose dismissable={false} class="text-white rounded-none shadow-lg x-cloak text-md bg-brandBlack shadow-black/50n">
    <h2 class="text-xxl">
      <EpSuccessFilled class="inline top-[-2px] relative mr-2" />Thanks for your selection!
    </h2>
    <p>Your selection was successfully submitted.  We'll review it and get back to you shortly.</p>
    <div class="flex flex-row justify-end w-full pt-6">
      <Button class="w-1/3 text-sm font-bold text-white uppercase transition rounded-none wfull-1 bg-gold hover:bg-gold-900">
        OK
      </Button>
    </div>
  </Modal>
</div>

