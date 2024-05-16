import type { SupabaseClient, Session } from "@supabase/supabase-js";

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession(): Promise<{ session: Session | null; user: User | null, prismic?: any }>;
		}
		interface PageData {
			session: Session | null;
			user?: User | null;
      prismic?: {
        company: string,
        prismicSlug: string,
        email: string
      }
		}
		// interface Error {}
		// interface Platform {}
	}
}

