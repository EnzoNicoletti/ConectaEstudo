import React from 'react';
import { ArrowRight, GraduationCap, Users, CheckCircle2, MessageSquareText } from 'lucide-react';

interface OnboardingScreenProps {
  onStart: () => void;
  onGoLogin: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onStart,
  onGoLogin,
}) => {
  return (
    <div className="min-h-full flex flex-col justify-between items-center px-6 py-8 text-center bg-gradient-to-b from-[#f6f7fb] via-[#fbfbfe] to-[#f4f2f9]">
      {/* Top Tag */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e8f1ff] text-[#3b6088] text-[11px] font-bold tracking-wider uppercase border border-[#d8e5f8] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#4ecdc4] animate-pulse" />
          <span>Comunidade Ativa</span>
        </div>
      </div>

      {/* Center Hero Graphic */}
      <div className="flex flex-col items-center my-auto py-6 max-w-sm">
        {/* Avatar Ring with Grad Cap Badge */}
        <div className="relative mb-8">
          <div className="w-36 h-36 rounded-full bg-white p-2.5 shadow-[0_12px_32px_rgba(83,67,123,0.12)] border border-[#e8e8e8] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#e2e2e2] relative flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80"
                alt="Estudantes em grupo"
                className="w-full h-full object-cover"
              />
              {/* Fallback overlay label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          {/* Floating purple icon badge at bottom right */}
          <div className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#53437b] text-white flex items-center justify-center shadow-md border-2 border-white">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#53437b] mb-2 font-sans">
          Conecta Estudo
        </h1>
        <h2 className="text-[19px] font-bold text-[#1a1c1c] mb-2.5">
          Encontre seu grupo de estudo ideal
        </h2>
        <p className="text-[14px] text-[#666666] max-w-xs leading-relaxed mb-6">
          Aprenda colaborativamente com estudantes de todo o Brasil.
        </p>

        {/* Feature Badges cluster */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8e8e8] text-[11px] font-bold tracking-wider text-[#43617b] shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#53437b]" />
            SALAS 24/7
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8e8e8] text-[11px] font-bold tracking-wider text-[#43617b] shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00716b]" />
            ENEM & VESTIBULARES
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8e8e8] text-[11px] font-bold tracking-wider text-[#43617b] shadow-xs">
            <MessageSquareText className="w-3.5 h-3.5 text-[#53437b]" />
            TIRA-DÚVIDAS
          </span>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="w-full max-w-xs flex flex-col items-center gap-4 pb-2">
        <button
          onClick={onStart}
          className="w-full py-3.5 px-6 rounded-xl bg-[#53437b] hover:bg-[#453667] active:scale-[0.98] text-white font-bold text-[16px] shadow-[0_4px_16px_rgba(83,67,123,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
        >
          <span>Começar</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="text-[14px] text-[#49454f]">
          Já tem uma conta?{' '}
          <button
            onClick={onGoLogin}
            className="font-bold text-[#53437b] hover:underline focus:outline-none cursor-pointer"
          >
            Entrar
          </button>
        </div>

        {/* Footer legal & version */}
        <div className="text-[11px] text-[#999999] pt-2 tracking-wide flex items-center gap-2">
          <span>Versão 2.4.0</span>
          <span>•</span>
          <a href="#termos" onClick={(e) => e.preventDefault()} className="hover:underline">
            Termos
          </a>
          <span>•</span>
          <a href="#privacidade" onClick={(e) => e.preventDefault()} className="hover:underline">
            Privacidade
          </a>
        </div>
      </div>
    </div>
  );
};
