import { createClient } from '$lib/prismicio';

export async function load({ parent, cookies })  {
  const data = await parent();
  const client = createClient({ fetch, cookies })
  const slug = data.prismicUser.prismicSlug;
  const designArchive = await client.getByUID("client_design_archive_page", slug);
  return {
    data,
    designArchive
  }
}

/*
data.account = await supabase
  .from("users")
  .select("prismicSlug")
  .eq("email", data.user.email);
*/