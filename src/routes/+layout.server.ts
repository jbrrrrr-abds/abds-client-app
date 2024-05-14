import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { safeGetSession } }) => {
  const { session, user, prismic } = await safeGetSession()
  const prismicUser = prismic.data[0]

	return {
		session,
    user,
    prismicUser,
	};
}) satisfies LayoutServerLoad