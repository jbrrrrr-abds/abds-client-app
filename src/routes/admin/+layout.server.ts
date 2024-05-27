import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit'


export const load: LayoutServerLoad = async ({ parent }) => {
  const data = await parent();
  if (!data.user || data.user.role !== 'authenticated' || !data.user.viewAccess) {
    return redirect(303, './login/unauthorized')
  }
}
