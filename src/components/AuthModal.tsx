import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { hasNunay, nunayize } from '../utils/nunayValidator';
import { saveUserProfile } from '../utils/storage';
import { User, Lock, Mail, Sparkles, CheckCircle2, AlertCircle, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState(currentUser.username || 'nunay_creator');
  const [displayName, setDisplayName] = useState(currentUser.displayName || 'nunay Designer');
  const [email, setEmail] = useState(currentUser.email || 'designer@nunay.com');
  const [password, setPassword] = useState('nunay123');

  if (!isOpen) return null;

  const validUsername = hasNunay(username);

  const handleNunayizeUsername = () => {
    setUsername(nunayize(username, 'nunay_user'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validUsername) {
      alert('Der Benutzername muss zwingend das Wort „nunay” enthalten!');
      return;
    }

    const updatedUser: UserProfile = {
      username: username.trim(),
      displayName: displayName.trim(),
      email: email.trim(),
      isLoggedIn: true,
    };

    saveUserProfile(updatedUser);
    onLoginSuccess(updatedUser);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.3 },
      colors: ['#10b981', '#34d399', '#f59e0b', '#ffffff'],
    });

    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser: UserProfile = {
      username: 'nunay_editor_vip',
      displayName: 'VIP nunay Editorial Director',
      email: 'vip@nunay-magazine.com',
      isLoggedIn: true,
    };
    saveUserProfile(demoUser);
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 no-print">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer border border-neutral-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title with Cursive Elegant Typography */}
        <div className="text-center mb-6">
          <span className="font-pinyon text-4xl text-neutral-900 leading-none block">
            Nunay Daily
          </span>
          <h2 className="text-base font-bold uppercase text-neutral-800 tracking-wider font-montserrat mt-1">
            {isRegister ? 'Create Account' : 'Studio Member Sign In'}
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Sign in to manage and persist your editorial magazine collections.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username with Nunay Check */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="font-semibold text-neutral-700 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-600" /> Username (Required)
              </label>
              {!validUsername && (
                <button
                  type="button"
                  onClick={handleNunayizeUsername}
                  className="text-[11px] text-amber-600 hover:text-amber-700 font-bold flex items-center gap-0.5 cursor-pointer underline"
                >
                  <Sparkles className="w-3 h-3" /> Auto-Fix
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. nunay_creator"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 border transition-all outline-none ${
                  validUsername
                    ? 'border-neutral-200 focus:border-emerald-600 text-neutral-900 focus:bg-white'
                    : 'border-rose-400 bg-rose-50 text-rose-900'
                }`}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {validUsername ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
            </div>
            <p className={`text-[11px] mt-1 ${validUsername ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}`}>
              {validUsername
                ? '✓ Username contains mandatory "nunay"'
                : '⚠️ Every username MUST contain the word "nunay"!'}
            </p>
          </div>

          {/* Display Name */}
          {isRegister && (
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Display Name / Title
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Editorial Director nunay"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-neutral-400" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@nunay.com"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 focus:bg-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-neutral-400" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 focus:bg-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-emerald-950/20 mt-2"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-4 pt-4 border-t border-neutral-100 text-center space-y-3">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 px-3 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 1-Click Demo Login (nunay_editor)
          </button>

          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-neutral-500 hover:text-emerald-700 underline cursor-pointer"
          >
            {isRegister
              ? 'Already registered? Sign in here'
              : 'Need an account? Register now'}
          </button>
        </div>
      </div>
    </div>
  );
};
