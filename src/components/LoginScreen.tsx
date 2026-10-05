import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onGoRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onGoRegister,
}) => {
  const [email, setEmail] = useState('sofia.estudante@conectaestudo.com.br');
  const [password, setPassword] = useState('vestibular2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, informe seu e-mail');
      return;
    }
    if (!password) {
      setError('Por favor, digite sua senha');
      return;
    }
    onLoginSuccess(email);
  };

  return (
    <div className="min-h-full flex flex-col justify-between px-5 py-6 bg-[#f9f9f9] text-[#1a1c1c]">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Top App Glyph */}
        <div className="relative mt-2 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#53437b] flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          {/* Cyan indicator badge */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4ecdc4] rounded-full ring-2 ring-white" />
        </div>

        {/* Category Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ecf6] text-[#53437b] text-[11px] font-bold tracking-wider uppercase mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Espaço de Estudos</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1a1c1c] text-center mb-1.5">
          Bem-vindo de volta
        </h1>
        <p className="text-[13px] text-[#666666] text-center max-w-xs mb-6 leading-relaxed">
          Acesse sua conta para continuar seus estudos e grupos ativos
        </p>

        {/* Form Card */}
        <div className="w-full bg-white rounded-2xl border border-[#e8e8e8] p-5 shadow-[0_2px_12px_rgba(26,58,82,0.04)] mb-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-bold text-[#1a1c1c]">E-mail</label>
                <span className="text-[11px] text-[#666666]">Institucional ou pessoal</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7580]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="seu@email.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#e8e8e8] bg-[#fdfdfd] text-[14px] text-[#1a1c1c] placeholder:text-[#999999] focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-bold text-[#1a1c1c]">Senha</label>
                <button
                  type="button"
                  onClick={() => alert('Link de recuperação enviado para seu e-mail cadastrado!')}
                  className="text-[11px] font-medium text-[#53437b] hover:underline focus:outline-none"
                >
                  Esqueceu sua senha?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7580]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Sua senha"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#e8e8e8] bg-[#fdfdfd] text-[14px] text-[#1a1c1c] placeholder:text-[#999999] focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a7580] hover:text-[#1a1c1c] focus:outline-none"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Secure Session */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#49454f]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#53437b] focus:ring-[#53437b] border-[#cac4d0]"
                />
                <span>Lembrar neste aparelho</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-[#00716b] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ecdc4]" />
                <span>Sessão segura</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#53437b] hover:bg-[#453667] active:scale-[0.98] text-white font-bold text-[15px] shadow-[0_4px_12px_rgba(83,67,123,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none mt-2"
            >
              <span>Entrar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Divider "ou" */}
        <div className="w-full flex items-center gap-3 my-2 text-[12px] text-[#999999]">
          <div className="flex-1 h-px bg-[#e8e8e8]" />
          <span>ou</span>
          <div className="flex-1 h-px bg-[#e8e8e8]" />
        </div>

        {/* Social Logins */}
        <div className="w-full grid grid-cols-2 gap-3 mt-3">
          {/* Google Button */}
          <button
            type="button"
            onClick={() => onLoginSuccess('sofia.estudante@gmail.com')}
            className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl bg-white border border-[#e8e8e8] text-[13px] font-semibold text-[#1a1c1c] hover:bg-[#f3f3f3] transition-colors shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Gov.br Button */}
          <button
            type="button"
            onClick={() => onLoginSuccess('sofia.gov@estudante.com.br')}
            className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl bg-white border border-[#e8e8e8] text-[13px] font-semibold text-[#1a1c1c] hover:bg-[#f3f3f3] transition-colors shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#003882]" />
            <span>Acesso Gov.br</span>
          </button>
        </div>
      </div>

      {/* Footer link to Register */}
      <div className="text-center py-4 text-[13px] text-[#666666]">
        Não tem conta?{' '}
        <button
          onClick={onGoRegister}
          className="font-bold text-[#53437b] hover:underline focus:outline-none cursor-pointer"
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );
};
