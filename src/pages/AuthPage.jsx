import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/hooks/useAuth'
import SEO from '@/components/SEO'
import clsx from 'clsx'

// ── Shared primitives ────────────────────────────────────────────────────────

function Input({ label, id, error, right, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={clsx(
            'w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl outline-none transition-colors',
            'focus:ring-2 focus:ring-gray-900 focus:border-transparent',
            error ? 'border-red-300' : 'border-gray-200',
            right && 'pr-10'
          )}
          {...props}
        />
        {right && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

function PasswordInput({ label, id, value, onChange, error }) {
  const [visible, setVisible] = useState(false)
  return (
    <Input
      label={label}
      id={id}
      type={visible ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      error={error}
      autoComplete={id === 'password' ? 'current-password' : 'new-password'}
      right={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          tabIndex={-1}
        >
          {visible
            ? <EyeSlashIcon className="w-4 h-4" />
            : <EyeIcon className="w-4 h-4" />}
        </button>
      }
    />
  )
}

function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
}

function ErrorBanner({ message }) {
  if (!message) return null
  return (
    <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
      {message}
    </div>
  )
}

// ── Sign In ──────────────────────────────────────────────────────────────────

function SignInForm({ onForgot, onSuccess }) {
  const { signIn } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn({ email, password })
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ErrorBanner message={error} />
      <Input
        label="Email address"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <button
            type="button"
            onClick={onForgot}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
        <PasswordInput
          id="password"
          label=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <SubmitButton loading={loading}>Sign In</SubmitButton>
    </form>
  )
}

// ── Sign Up ──────────────────────────────────────────────────────────────────

function SignUpForm({ onVerify }) {
  const { signUp } = useAuth()
  const [fullName, setFullName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!fullName.trim()) errs.fullName = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email.'
    if (password.length < 8) errs.password = 'Password must be at least 8 characters.'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setError('')
    setLoading(true)
    try {
      await signUp({ email, password, fullName })
      onVerify(email)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ErrorBanner message={error} />
      <Input
        label="Full name"
        id="fullName"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        autoComplete="name"
        error={fieldErrors.fullName}
        required
      />
      <Input
        label="Email address"
        id="email-signup"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        error={fieldErrors.email}
        required
      />
      <PasswordInput
        label="Password"
        id="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
      />
      <p className="text-xs text-gray-500">
        By creating an account you agree to our{' '}
        <Link to="/terms" className="text-indigo-600 hover:underline">Terms</Link> and{' '}
        <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
      </p>
      <SubmitButton loading={loading}>Create Account</SubmitButton>
    </form>
  )
}

// ── Forgot Password ──────────────────────────────────────────────────────────

function ForgotPasswordForm({ onBack }) {
  const { sendPasswordReset } = useAuth()
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await sendPasswordReset(email)
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-4 space-y-3">
        <CheckCircleIcon className="w-12 h-12 text-emerald-500 mx-auto" />
        <p className="font-semibold text-gray-900">Check your inbox</p>
        <p className="text-sm text-gray-500">
          We sent a password reset link to <strong>{email}</strong>.
        </p>
        <button onClick={onBack} className="text-sm text-indigo-600 hover:underline cursor-pointer">
          Back to sign in
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-500">
        Enter your email and we'll send you a link to reset your password.
      </p>
      <ErrorBanner message={error} />
      <Input
        label="Email address"
        id="reset-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <SubmitButton loading={loading}>Send Reset Link</SubmitButton>
      <button
        type="button"
        onClick={onBack}
        className="w-full text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        ← Back to sign in
      </button>
    </form>
  )
}

// ── Verify Email Notice ──────────────────────────────────────────────────────

function VerifyNotice({ email }) {
  return (
    <div className="text-center py-4 space-y-3">
      <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-3xl">
        📬
      </div>
      <p className="font-semibold text-gray-900">Verify your email</p>
      <p className="text-sm text-gray-500 leading-relaxed">
        We sent a confirmation link to <strong>{email}</strong>.<br />
        Click it to activate your account.
      </p>
      <p className="text-xs text-gray-400">Didn't receive it? Check your spam folder.</p>
    </div>
  )
}

// ── Page shell ───────────────────────────────────────────────────────────────

export default function AuthPage() {
  const { isAuthenticated } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from ?? '/'

  // Default tab from ?mode= param
  const initialTab = new URLSearchParams(location.search).get('mode') === 'signup' ? 'signup' : 'signin'
  const [tab,        setTab]    = useState(initialTab)  // 'signin' | 'signup'
  const [view,       setView]   = useState('form')       // 'form' | 'forgot' | 'verify'
  const [verifyEmail, setVerifyEmail] = useState('')

  if (isAuthenticated) {
    navigate(from, { replace: true })
    return null
  }

  const handleSuccess = () => navigate(from, { replace: true })
  const handleVerify  = (email) => { setVerifyEmail(email); setView('verify') }

  return (
    <>
      <SEO
        title={tab === 'signup' ? 'Create Account' : 'Sign In'}
        description="Sign in or create a ShopFlow account to track orders, save your wishlist, and check out faster."
        noIndex
      />

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 justify-center mb-8">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">SF</span>
              </div>
              <span className="font-semibold text-[17px] text-gray-900 tracking-tight">ShopFlow</span>
            </Link>

            {/* Forgot password view */}
            {view === 'forgot' && (
              <>
                <h1 className="text-xl font-bold text-gray-900 text-center mb-6">Reset password</h1>
                <ForgotPasswordForm onBack={() => setView('form')} />
              </>
            )}

            {/* Verify email view */}
            {view === 'verify' && <VerifyNotice email={verifyEmail} />}

            {/* Main form view */}
            {view === 'form' && (
              <>
                {/* Tab switcher */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-7">
                  {[
                    { key: 'signin', label: 'Sign In' },
                    { key: 'signup', label: 'Sign Up' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTab(key)}
                      className={clsx(
                        'flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer',
                        tab === key
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  {tab === 'signin' ? 'Welcome back' : 'Create your account'}
                </h1>

                {tab === 'signin'
                  ? <SignInForm onForgot={() => setView('forgot')} onSuccess={handleSuccess} />
                  : <SignUpForm onVerify={handleVerify} />}
              </>
            )}
          </div>

          {/* Below-card help text */}
          {view === 'form' && (
            <p className="text-center text-sm text-gray-500 mt-5">
              {tab === 'signin' ? (
                <>Don't have an account?{' '}
                  <button onClick={() => setTab('signup')} className="text-indigo-600 font-medium hover:underline cursor-pointer">Sign up</button>
                </>
              ) : (
                <>Already have an account?{' '}
                  <button onClick={() => setTab('signin')} className="text-indigo-600 font-medium hover:underline cursor-pointer">Sign in</button>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
