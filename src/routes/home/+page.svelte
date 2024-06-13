<script>
  export let data;
  const companyName = data.data.prismicUser.companies.name;
  const user = data.session?.user.email
</script>
<div>
  <h1>Logged in</h1>
  <p class="mt-4 text-sm">
    { user }<br />
    { companyName }
  </p>
</div>
