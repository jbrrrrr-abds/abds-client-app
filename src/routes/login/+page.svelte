<script lang="ts">
  import { Input } from '$lib/components/ui/input'
  import { Button } from '$lib/components/ui/button'

  let email: string
  let password: string
</script>

<div class="flex flex-col">
  <h1 class="text-center max-w-[800px] mx-auto text-2xl mb-4">
    Please log in to view your design archive
  </h1>

  <section class="flex flex-col self-center p-6 bg-white border rounded-md border-brandBlack md:w-1/3 sm:w-full">
    <form action="?/login" method="POST">
      <div>
        <label class="text-xs font-bold" for="email">Email:</label>
        <Input
          type="email"
          name="email"
          id="email"
          class="border-brandBlack-300"
          value={email}
          required
          autocomplete="username"
        />
      </div>
      <div>
        <label class="text-xs font-bold" for="password">Password:</label>
        <Input
          type="password"
          name="password"
          id="password"
          class="border-brandBlack-300"
          value={password}
          autocomplete="current-password"
          required
        />
      </div>
      <div class="flex justify-end mt-3">
        <Button class="transition-colors duration-200 ease-in-out bg-brandBlack hover:bg-gold" type="submit">Log In</Button>
      </div>
    </form>
  </section>
</div>