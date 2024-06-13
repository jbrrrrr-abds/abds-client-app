import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import type { Handle } from "@sveltejs/kit";
import { sequence } from '@sveltejs/kit/hooks'

interface ClientAppUser extends User {
  viewAccess: boolean
}

const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: "/" });
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: "/" });
				},
			},
		},
	);

	event.locals.safeGetSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser() as { data: { user: ClientAppUser }, error: any};
		if (error) {
			// JWT validation has failed
			return { session: null, user: null };
		}



    let prismic: { accountEmail?: string, data?: any, error?: any, handle?: string} = {};
    // query Supabase to get the Prismic slug on the auth'd user account
    if (user && user.role === 'authenticated') {
      prismic = await event.locals.supabase.from('users')
      .select(`
        companyID,
        companies(name, handle)
      `)
      .eq("id", user.id);
      prismic.accountEmail = user.email
      user.viewAccess = true
    }
		return { session, user, prismic };
	};


	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range" || name === "x-supabase-api-version";
		},
	});
};

export const handle: Handle = sequence(supabase)
