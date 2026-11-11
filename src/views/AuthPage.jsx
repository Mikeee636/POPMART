import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShieldCheck
} from 'lucide-react';

export const AuthPage = () => {
  const { loginAdmin, registerAdmin, showToast } = useStore();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login Form State (pre-filled with official admin credentials)
  const [loginForm, setLoginForm] = useState({
    email: 'admin@popmart.co.id',
    password: 'admin123'
  });

  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    role: 'Admin',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email.trim()) {
      showToast('Harap masukkan email.', 'error');
      return;
    }

    loginAdmin({
      email: loginForm.email.trim()
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.name.trim() || !registerForm.email.trim()) {
      showToast('Harap lengkapi semua kolom yang wajib diisi.', 'error');
      return;
    }

    if (registerForm.password && registerForm.password !== registerForm.confirmPassword) {
      showToast('Konfirmasi password tidak cocok!', 'error');
      return;
    }

    registerAdmin({
      name: registerForm.name,
      email: registerForm.email,
      role: registerForm.role,
      avatar: ''
    });

    // Otomatis isi email di form login dan redirect ke tampilan login
    setLoginForm({
      email: registerForm.email,
      password: registerForm.password || ''
    });

    // Reset formulir register
    setRegisterForm({
      name: '',
      email: '',
      role: 'Admin',
      password: '',
      confirmPassword: ''
    });

    // Redirect ke halaman login
    setIsLoginMode(true);
  };

  const handleForgotPassword = () => {
    showToast('Gunakan password default: admin123 untuk akun Admin resmi.', 'info');
  };

  return (
    <div className="h-screen max-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden font-sans selection:bg-red-600 selection:text-white">
      {/* ============================================================== */}
      {/* 1. BACKGROUND IMAGE (Pop Mart Theme Park - Gambar Kedua)       */}
      {/* ============================================================== */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: "url('/images/popmart-theme-park.jpg')",
          backgroundPosition: 'center 35%'
        }}
      />

      {/* ============================================================== */}
      {/* 2. HIGHLIGHTING & STUDIO LIGHTING OVERLAY                       */}
      {/* Memberi efek highlight terpusat & vignette sinematik          */}
      {/* ============================================================== */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 65% at 38% 45%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 42%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.72) 100%),
            linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.22) 45%, rgba(0, 0, 0, 0.38) 100%)
          `
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/35" />
      <div className="fixed top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-300/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ============================================================== */}
      {/* 3. LOGO POP MART (Mentok Kiri Atas)                            */}
      {/* ============================================================== */}
      <div className="absolute top-3 left-4 sm:top-4 sm:left-6 lg:top-5 lg:left-8 z-30">
        <img
          src="/popmart-red-logo.png"
          alt="POP MART"
          className="h-9 sm:h-11 lg:h-12 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* ============================================================== */}
      {/* 4. MAIN FOREGROUND CONTENT CONTAINER (Centered & Non-Scrollable) */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex items-center justify-center">
        
        {/* Row: Left Showcase Text + Right Floating Auth Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full py-4">
          
          {/* LEFT SIDE: Big Bold Headline (Sesuai Desain Gambar 1) */}
          <div className="lg:col-span-7 xl:col-span-7 text-white space-y-4 max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
              Every big thing <br />starts small
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/95 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-relaxed">
              Log in and continue exploring the official Pop Mart universe.
            </p>
          </div>

          {/* RIGHT SIDE: Floating Login/Register Card (Sesuai Desain Gambar 1) */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] bg-[#fffaf5] dark:bg-zinc-900/95 backdrop-blur-2xl rounded-[36px] sm:rounded-[42px] p-7 sm:p-9 shadow-[0_30px_70px_rgba(0,0,0,0.45)] border border-white/60 dark:border-zinc-800 transition-all duration-300">
              
              {/* Card Title */}
              <h2 className="text-2xl sm:text-[26px] font-bold text-zinc-900 dark:text-white text-center mb-6 tracking-tight">
                {isLoginMode ? 'Log in to your account' : 'Create your account'}
              </h2>

              {/* ======================= */}
              {/* LOGIN FORM              */}
              {/* ======================= */}
              {isLoginMode ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Email address */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Email address
                    </label>
                    <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 px-4 py-3.5 flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all">
                      <Mail className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Password
                    </label>
                    <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 px-4 py-3.5 flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all">
                      <Lock className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
                        aria-label="Toggle password"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Forgot your password? Link */}
                    <div className="text-right mt-1.5">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[11px] sm:text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer transition"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>

                  {/* Primary Action Button ("Log in" Pop Mart Red) */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#e50012] hover:bg-[#c90010] active:bg-[#a8000d] text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/30 transition-all duration-200 cursor-pointer active:scale-[0.99] mt-3"
                  >
                    Log in
                  </button>

                  {/* Switch to Register Link */}
                  <div className="text-center pt-3 text-xs text-zinc-500 dark:text-zinc-400">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLoginMode(false)}
                      className="font-bold text-[#e50012] dark:text-red-400 hover:underline cursor-pointer"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              ) : (
                /* ======================= */
                /* REGISTER FORM           */
                /* ======================= */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  {/* Your Name */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 px-4 py-3 flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all">
                      <User className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                      <input
                        type="text"
                        required
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        placeholder="Michael"
                        className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email address */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 px-4 py-3 flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all">
                      <Mail className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                      <input
                        type="email"
                        required
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        placeholder="michael@popmart.co.id"
                        className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Password
                      </label>
                      <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 px-3.5 py-2.5 flex items-center gap-2 shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-transparent text-xs font-mono text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5"
                          aria-label="Toggle password"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Konfirmasi
                      </label>
                      <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 px-3.5 py-2.5 flex items-center gap-2 shadow-sm focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-transparent text-xs font-mono text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(prev => !prev)}
                          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5"
                          aria-label="Toggle confirm password"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#e50012] hover:bg-[#c90010] active:bg-[#a8000d] text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/30 transition-all duration-200 cursor-pointer active:scale-[0.99] mt-3"
                  >
                    Create Account
                  </button>

                  {/* Switch to Login Link */}
                  <div className="text-center pt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLoginMode(true)}
                      className="font-bold text-[#e50012] dark:text-red-400 hover:underline cursor-pointer"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
