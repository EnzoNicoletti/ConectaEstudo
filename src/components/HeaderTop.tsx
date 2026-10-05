import React from 'react';
import { Bell, GraduationCap } from 'lucide-react';
import { UserProfile } from '../data/studyData';

interface HeaderTopProps {
  user: UserProfile;
  unreadCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onLogoClick: () => void;
}

export const HeaderTop: React.FC<HeaderTopProps> = ({
  user,
  unreadCount = 2,
  onOpenNotifications,
  onOpenProfile,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#e8e8e8]">
      {/* Brand logo */}
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2.5 focus:outline-none group text-left"
        title="Voltar para Início"
      >
        <div className="w-8 h-8 rounded-lg bg-[#53437b] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <span className="font-extrabold text-[17px] tracking-tight text-[#1a1c1c] group-hover:text-[#53437b] transition-colors">
          Conecta Estudo
        </span>
      </button>

      {/* Right controls */}
      <div className="flex items-center gap-2.5">
        {/* Notifications button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-[#49454f] hover:bg-[#eeeeee] transition-colors focus:outline-none"
          aria-label="Notificações"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#f9f9f9]" />
          )}
        </button>

        {/* User Avatar with online indicator */}
        <button
          onClick={onOpenProfile}
          className="relative focus:outline-none rounded-full group"
          title="Ver perfil"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#53437b] transition-all"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4ecdc4] rounded-full ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};
