<script lang="ts">
  import * as config from '$lib/config'
  import { Logo } from '$lib/components/Logo'
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
  import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr'
  import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
  import { goto } from '$app/navigation'
  import { redirect } from '@sveltejs/kit'
  import type { SupabaseClient } from '@supabase/supabase-js'

  export let data;

  const supabase: SupabaseClient = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
  const logout = async () => {

    const { error } = await supabase.auth.signOut();
    console.log(error);
    goto('./login')
  }
</script>

<header class="w-full bg-brandBlack">
  <Navbar class="container w-full bg-transparent">
    <NavBrand href="/">
      <h1 class="py-2 max-w-32">
        <Logo className="w-[8rem] text-white"/>
      </h1>
    </NavBrand>
    <NavHamburger  />
    <NavUl class="text-base uppercase font-Anton ">
      <NavLi href="/designs" class="text-base text-white">Designs</NavLi>
      {#if data.session }
        <NavLi href="#" on:click={() => logout()} class="text-base text-white">Log Out</NavLi>
      {:else}
        <NavLi href="./login" on:click={() => redirect(302, '/login')} class="text-base text-white">Log In</NavLi>
      {/if}
    </NavUl>
  </Navbar>
</header>

<style>

</style>