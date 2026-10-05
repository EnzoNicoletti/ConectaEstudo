import React from 'react';
import { Home, Compass, Users, BookOpen, User } from 'lucide-react';

export type MainTab = 'inicio' | 'explorar' | 'meus-grupos' | 'conteudos' | 'perfil';

interface BottomNavProps {
  activeTab: MainTab;
  onChangeTab: (tab: MainTab) => void;
  myGroupsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  myGroupsCount = 3,
}) => {
  const tabs = [
    { id: 'inicio' as MainTab, label: 'Início', icon: Home },
    { id: 'explorar' as MainTab, label: 'Explorar', icon: Compass },
    { id: 'meus-grupos' as MainTab, label: 'Meus Grupos', icon: Users, badge: myGroupsCount },
    { id: 'conteudos' as MainTab, label: 'Conteúdos', icon: BookOpen },
    { id: 'perfil' as MainTab, label: 'Perfil', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md border-t border-[#e8e8e8] shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative focus:outline-none ${
                isActive ? 'text-[#53437b]' : 'text-[#666666] hover:text-[#1a1c1c]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && tab.badge > 0 && tab.id === 'meus-grupos' && (
                  <span className="absolute -top-1 -right-2 bg-[#53437b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 font-medium tracking-tight ${
                  isActive ? 'font-bold text-[#53437b]' : 'text-[#666666]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 bg-[#53437b] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
