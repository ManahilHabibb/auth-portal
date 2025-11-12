import { dark } from '@clerk/themes';

export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#4f46e5',
    colorBackground: '#ffffff',
    borderRadius: '1rem',
    fontSize: '1rem',
  },
  elements: {
    card: 'shadow-2xl border border-slate-200',
    headerTitle: 'text-3xl font-extrabold text-slate-900',
    headerSubtitle: 'text-slate-500',
    socialButtons: 'gap-3',
    socialButtonsIconButton: 'border border-slate-200 hover:bg-slate-100 transition-colors',
    formFieldLabel: 'text-slate-600 font-semibold',
    formFieldInput: 'rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-800',
    footerAction__signIn: 'text-slate-600',
    footerAction__signUp: 'text-slate-600',
    footerActionLink: 'text-indigo-600 font-semibold hover:text-indigo-500',
    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-200 transition-transform hover:-translate-y-0.5',
    otpCodeFieldInput: 'rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500',
  },
};
