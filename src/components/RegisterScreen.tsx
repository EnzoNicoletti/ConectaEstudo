import React, { useState } from 'react';
import { User, Mail, BookOpen, Lock, Eye, EyeOff, ArrowRight, GraduationCap, Sparkles, Check } from 'lucide-react';

interface RegisterScreenProps {
  onRegisterSuccess: (userData: { name: string; email: string; schoolLevel: string }) => void;
  onGoLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onGoLogin,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTips, setAgreeTips] = useState(true);
  const [error, setError] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'Muito curta', level: 0, color: 'text-gray-400' };
    if (pwd.length < 6) return { label: 'Muito curta', level: 1, color: 'text-red-500' };
    if (pwd.length < 10) return { label: 'Média', level: 2, color: 'text-amber-500' };
    return { label: 'Forte', level: 3, color: 'text-emerald-600' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Por favor, digite seu nome completo');
      return;
    }
    if (!email.trim()) {
      setError('Por favor, informe seu e-mail');
      return;
    }
    if (!schoolLevel) {
      setError('Por favor, selecione seu momento de estudos');
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    onRegisterSuccess({
      name: fullName.trim(),
      email: email.trim(),
      schoolLevel: schoolLevel,
    });
  };

  return (
    <div className="min-h-full flex flex-col justify-between px-5 py-6 bg-[#f9f9f9] text-[#1a1c1c]">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Top Icon with Star Badge */}
        <div className="relative mt-1 mb-3">
          <div className="w-14 h-14 rounded-full bg-[#f0ecf6] text-[#53437b] flex items-center justify-center shadow-xs">
            <GraduationCap className="w-7 h-7 text-[#53437b]" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#4ecdc4] rounded-full flex items-center justify-center text-white ring-2 ring-white shadow-xs">
            <Sparkles className="w-3 h-3 text-white" />
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1a1c1c] text-center mb-1">
          Criar Conta
        </h1>
        <p className="text-[13px] text-[#666666] text-center max-w-xs mb-5">
          Junte-se à comunidade de estudantes
        </p>

        {/* Form Card */}
        <div className="w-full bg-white rounded-2xl border border-[#e8e8e8] p-5 shadow-[0_2px_12px_rgba(26,58,82,0.04)] mb-4">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Nome Completo */}
            <div>
              <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#1a1c1c] mb-1">
                <User className="w-3.5 h-3.5 text-[#53437b]" />
                <span>Nome completo</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setError('');
                }}
                placeholder="Ex: Ana Carolina Silva"
                className="w-full h-11 px-3.5 rounded-xl border border-[#e8e8e8] bg-[#fdfdfd] text-[13.5px] text-[#1a1c1c] placeholder:text-[#999999] focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#1a1c1c] mb-1">
                <span className="text-[#53437b] font-bold text-xs">@</span>
                <span>E-mail</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="seu@email.com"
                className="w-full h-11 px-3.5 rounded-xl border border-[#e8e8e8] bg-[#fdfdfd] text-[13.5px] text-[#1a1c1c] placeholder:text-[#999999] focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
              />
            </div>

            {/* Nível Escolar */}
            <div>
              <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#1a1c1c] mb-1">
                <BookOpen className="w-3.5 h-3.5 text-[#53437b]" />
                <span>Nível escolar</span>
              </label>
              <div className="relative">
                <select
                  value={schoolLevel}
                  onChange={(e) => {
                    setSchoolLevel(e.target.value);
                    setError('');
                  }}
                  className="w-full h-11 px-3.5 pr-8 rounded-xl border border-[#e8e8e8] bg-[#fdfdfd] text-[13px] text-[#1a1c1c] focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Selecione seu momento de estudos
                  </option>
                  <option value="Ensino Médio (1º / 2º ano)">Ensino Médio (1º / 2º ano)</option>
                  <option value="Ensino Médio (3º ano)">Ensino Médio (3º ano)</option>
                  <option value="Pré-Vestibular / Cursinho">Pré-Vestibular / Cursinho</option>
                  <option value="Graduação / Faculdade">Graduação / Faculdade</option>
                  <option value="Concursos Públicos">Concursos Públicos</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#7a7580]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#1a1c1c] mb-1">
                <Lock className="w-3.5 h-3.5 text-[#53437b]" />
                <span>Senha</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full h-11 px-3.5 pr-10 rounded-xl border border-[#e8e8e8] bg-[#fdfdfd] text-[13.5px] text-[#1a1c1c] placeholder:text-[#999999] focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a7580] hover:text-[#1a1c1c] focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength bar */}
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-[#666666]">Força da senha:</span>
                <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mt-1">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    strength.level >= 1 ? (strength.level === 1 ? 'bg-red-400' : strength.level === 2 ? 'bg-amber-400' : 'bg-emerald-500') : 'bg-[#e2e2e2]'
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    strength.level >= 2 ? (strength.level === 2 ? 'bg-amber-400' : 'bg-emerald-500') : 'bg-[#e2e2e2]'
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    strength.level >= 3 ? 'bg-emerald-500' : 'bg-[#e2e2e2]'
                  }`}
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#1a1c1c] mb-1">
                <Check className="w-3.5 h-3.5 text-[#53437b]" />
                <span>Confirmar senha</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite a senha novamente"
                className="w-full h-11 px-3.5 rounded-xl border border-[#e8e8e8] bg-[#fdfdfd] text-[13.5px] text-[#1a1c1c] placeholder:text-[#999999] focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
              />
            </div>

            {/* Agree checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-[11.5px] text-[#49454f] leading-snug">
                <input
                  type="checkbox"
                  checked={agreeTips}
                  onChange={(e) => setAgreeTips(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-[#53437b] focus:ring-[#53437b] border-[#cac4d0]"
                />
                <span>
                  Concordo em receber dicas acadêmicas e novidades de grupos de estudos.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#53437b] hover:bg-[#453667] active:scale-[0.98] text-white font-bold text-[15px] shadow-[0_4px_12px_rgba(83,67,123,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none mt-2"
            >
              <span>Criar conta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer link to Login */}
      <div className="text-center py-4 text-[13px] text-[#666666]">
        Já tem conta?{' '}
        <button
          onClick={onGoLogin}
          className="font-bold text-[#53437b] hover:underline focus:outline-none cursor-pointer"
        >
          Faça login
        </button>
      </div>
    </div>
  );
};
