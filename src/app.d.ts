import type { SupabaseClient, Session, User } from "@supabase/supabase-js";

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession(): Promise<{ session: Session | null; user: ClientAppUser | null, prismic?: any }>;
			session: Session | null,
		}
		interface PageData {
			session: Session | null;
			user?: ClientAppUser | null;
      prismic?: {
        company: string,
        prismicSlug: string,
        email: string,
      }
		}
		// interface Error {}
		// interface Platform {}
	}
}
