import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { safeGetSession } }) => {
  const { session, user, prismic } = await safeGetSession()
  // safety check if prismic doesn't have an object to return (i.e. not logged in)
  if (!prismic.data) { return }
  const prismicUser = prismic.data[0]

	return {
		session,
    user,
    prismicUser,
	};
}) satisfies LayoutServerLoad