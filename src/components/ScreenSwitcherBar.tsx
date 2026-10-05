import React, { useState } from 'react';
import { Smartphone, Monitor, Layers, ChevronDown, Sparkles } from 'lucide-react';

export type ScreenId =
  | 'onboarding'
  | 'login'
  | 'register'
  | 'home'
  | 'explore'
  | 'filter'
  | 'detail'
  | 'my-groups'
  | 'virtual-room';

interface ScreenSwitcherBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}

export const ScreenSwitcherBar: React.FC<ScreenSwitcherBarProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleFrame,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenId; label: string; badge: string }[] = [
    { id: 'onboarding', label: '1. Onboarding / Boas-vindas', badge: 'Img 1' },
    { id: 'login', label: '2. Login / Entrar', badge: 'Img 3' },
    { id: 'register', label: '3. Criar Conta', badge: 'Img 5' },
    { id: 'home', label: '4. Início (Dashboard)', badge: 'Img 7' },
    { id: 'explore', label: '5. Explorar Grupos', badge: 'Img 9' },
    { id: 'filter', label: '6. Filtros (Ajuste seu foco)', badge: 'Img 11' },
    { id: 'detail', label: '7. Detalhes do Grupo', badge: 'Img 13' },
    { id: 'my-groups', label: '8. Meus Grupos', badge: 'Img 15' },
    { id: 'virtual-room', label: '★ Sala Virtual (Google Meet)', badge: 'Live' },
  ];

  const currentLabel = screens.find((s) => s.id === currentScreen)?.label || 'Navegar Telas';

  return (
    <div className="bg-[#1a1c1c] text-white py-2 px-3 text-xs shadow-md border-b border-black/20 select-none z-40 relative">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 flex-wrap">
        {/* Left: Quick screen dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2f3131] hover:bg-[#3d3f3f] text-white font-bold transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#4ecdc4]" />
            <span className="hidden sm:inline text-neutral-400 font-normal">Telas do Protótipo:</span>
            <span className="text-[#7cf6ec]">{currentLabel}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-[#232525] border border-[#3f4141] rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-fadeIn">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#999999] border-b border-[#333535]">
                Selecione uma das 8 Telas
              </div>
              <div className="max-h-80 overflow-y-auto">
                {screens.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectScreen(s.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-[#323434] transition-colors ${
                      currentScreen === s.id ? 'bg-[#53437b] text-white font-bold' : 'text-neutral-200'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                      {s.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center: Quick pills for desktop */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar">
          {screens.slice(0, 8).map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSelectScreen(s.id)}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                currentScreen === s.id
                  ? 'bg-[#53437b] text-white shadow-xs font-bold'
                  : 'text-neutral-300 hover:bg-[#2f3131] hover:text-white'
              }`}
            >
              {idx + 1}. {s.badge}
            </button>
          ))}
        </div>

        {/* Right: Device frame mode toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFrame}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2f3131] hover:bg-[#3d3f3f] text-white font-semibold transition-colors cursor-pointer"
            title={isMobileFrame ? 'Mudar para visualização completa' : 'Mudar para moldura de celular'}
          >
            {isMobileFrame ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#4ecdc4]" />
                <span className="text-[11px]">Moldura Mobile</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#7cf6ec]" />
                <span className="text-[11px]">Visualização Ampla</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
