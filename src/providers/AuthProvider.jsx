import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'

export default function AuthProvider({ children }) {
  const setSession = useAuthStore((s) => s.setSession)
  const setLoading = useAuthStore((s) => s.setLoading)

  useEffect(() => {
    // Hydrate session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Keep store in sync with every auth event
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  return children
}
