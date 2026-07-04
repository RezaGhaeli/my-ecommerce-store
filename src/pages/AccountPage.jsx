import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserCircleIcon,
  ShoppingBagIcon,
  HeartIcon,
  ArrowRightStartOnRectangleIcon,
  PencilSquareIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'
import SEO from '@/components/SEO'

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  )
}

function ChangePasswordForm({ updatePassword, onDone }) {
  const [current,  setCurrent]  = useState('')
  const [next,     setNext]     = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (next !== confirm) { setError('Passwords do not match.'); return }
    if (next.length < 8)  { setError('Minimum 8 characters.'); return }
    setError('')
    setLoading(true)
    try {
      await updatePassword(next)
      setSuccess(true)
      setTimeout(onDone, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
        <CheckIcon className="w-4 h-4" /> Password updated!
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-3">
      {error && <p className="text-xs text-red-600">{error}</p>}
      {[
        { id: 'cur',  label: 'Current password', val: current,  set: setCurrent,  auto: 'current-password' },
        { id: 'new',  label: 'New password',      val: next,     set: setNext,     auto: 'new-password' },
        { id: 'conf', label: 'Confirm password',  val: confirm,  set: setConfirm,  auto: 'new-password' },
      ].map(({ id, label, val, set, auto }) => (
        <div key={id}>
          <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
          <input
            type="password"
            value={val}
            onChange={(e) => set(e.target.value)}
            autoComplete={auto}
            required
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          />
        </div>
      ))}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-xs font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition-colors cursor-pointer"
        >
          {loading ? 'Saving…' : 'Update Password'}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function AccountPage() {
  const { user, loading, isAuthenticated, displayName, initials, signOut, updatePassword } = useAuth()
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { from: '/account' } })
    }
  }, [loading, isAuthenticated])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      navigate('/')
    } catch {
      setSigningOut(false)
    }
  }

  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '—'

  return (
    <>
      <SEO
        title="My Account"
        description="Manage your ShopFlow account, orders, and preferences."
        noIndex
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-bold select-none">
            {initials || <UserCircleIcon className="w-8 h-8" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Member since {joined}</p>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {/* Profile details */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Profile</h2>
            <InfoRow label="Full name" value={displayName} />
            <InfoRow label="Email"     value={user?.email ?? '—'} />
            <InfoRow label="Member since" value={joined} />
          </div>

          {/* Quick links */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {[
              { icon: ShoppingBagIcon, label: 'My Orders',  sub: 'View order history',    to: '/' },
              { icon: HeartIcon,       label: 'Wishlist',   sub: "Items you've saved",    to: '/wishlist' },
            ].map(({ icon: Icon, label, sub, to }) => (
              <Link
                key={to + label}
                to={to}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Security */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Security</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Password</p>
                <p className="text-xs text-gray-500">Update your account password</p>
              </div>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  <PencilSquareIcon className="w-3.5 h-3.5" />
                  Change
                </button>
              )}
            </div>
            {showPasswordForm && (
              <ChangePasswordForm updatePassword={updatePassword} onDone={() => setShowPasswordForm(false)} />
            )}
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 hover:border-red-200 font-medium text-sm py-3 rounded-2xl transition-colors cursor-pointer"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
            {signingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </div>
    </>
  )
}
