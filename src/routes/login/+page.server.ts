import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'


export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    let userProfile;

    if (error) {
      console.error(error)
      return redirect(303, './login/unauthorized')
    } else {
      if (data.user && data.user.role === 'authenticated') {
        return redirect(303, '/designs')
      }

      return redirect(303, './login/unauthorized')
    }
  }
}
