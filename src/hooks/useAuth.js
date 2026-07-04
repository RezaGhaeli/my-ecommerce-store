import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const { user, session, loading } = useAuthStore()

  const noSupabase = () => { throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.') }

  const signUp = async ({ email, password, fullName }) => {
    if (!supabase) return noSupabase()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/account`,
      },
    })
    if (error) throw error
    return data
  }

  const signIn = async ({ email, password }) => {
    if (!supabase) return noSupabase()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    if (!supabase) return noSupabase()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const sendPasswordReset = async (email) => {
    if (!supabase) return noSupabase()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/reset-password`,
    })
    if (error) throw error
  }

  const updatePassword = async (newPassword) => {
    if (!supabase) return noSupabase()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Account'

  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    displayName,
    initials,
    signUp,
    signIn,
    signOut,
    sendPasswordReset,
    updatePassword,
  }
}
