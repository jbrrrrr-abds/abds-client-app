<script lang="ts">
  import * as config from '$lib/config'
  import { Logo } from '$lib/components/Logo'
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
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
      <NavLi href="/" class="text-base text-white">Home</NavLi>
      <NavLi href="/about" class="text-base text-white">Designs</NavLi>
      <NavLi href="/docs/components/navbar" class="text-base text-white">Contact</NavLi>
    </NavUl>
  </Navbar>
</header>

<style>

</style>