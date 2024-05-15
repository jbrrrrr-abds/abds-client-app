import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { safeGetSession } }) => {
  const { session, user, prismic } = await safeGetSession()
  let prismicUser;
  // safety check if prismic doesn't have an object to return (i.e. not logged in)
  if (!prismic) {
    prismicUser = '';
  } else {
    prismicUser = prismic.data[0]
  }

	return {
		session,
    user,
    prismicUser,
	};
}) satisfies LayoutServerLoad