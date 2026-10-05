import React from 'react';
import {
  User,
  Award,
  Flame,
  Clock,
  BookOpen,
  LogOut,
  Target,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../data/studyData';

interface ProfileScreenProps {
  user: UserProfile;
  onLogout: () => void;
  onViewMyGroups: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onLogout,
  onViewMyGroups,
}) => {
  return (
    <div className="flex flex-col pb-20 px-4 pt-4">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#e8e8e8] p-5 shadow-[0_2px_12px_rgba(26,58,82,0.04)] mb-4 text-center flex flex-col items-center">
        <div className="relative mb-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-[#f0ecf6] shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#4ecdc4] rounded-full ring-2 ring-white" />
        </div>

        <h2 className="text-xl font-extrabold text-[#1a1c1c]">{user.name}</h2>
        <p className="text-xs text-[#53437b] font-bold mt-0.5">{user.schoolLevel}</p>
        <p className="text-xs text-[#666666] mt-2 max-w-xs leading-relaxed">{user.bio}</p>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-[#f0f0f0]">
          <div className="p-2.5 rounded-xl bg-[#f9f9fb] flex flex-col items-center">
            <Flame className="w-4 h-4 text-amber-500 mb-1" />
            <span className="text-[14px] font-black text-[#1a1c1c]">{user.streakDays} dias</span>
            <span className="text-[10px] text-[#666666]">Ofensiva</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f9f9fb] flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-[#53437b] mb-1" />
            <span className="text-[14px] font-black text-[#1a1c1c]">{user.xp}</span>
            <span className="text-[10px] text-[#666666]">Pontos XP</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f9f9fb] flex flex-col items-center">
            <Clock className="w-4 h-4 text-[#00716b] mb-1" />
            <span className="text-[14px] font-black text-[#1a1c1c]">{user.studyHours}h</span>
            <span className="text-[10px] text-[#666666]">Estudadas</span>
          </div>
        </div>
      </div>

      {/* Goal Card */}
      <div className="bg-[#f0ecf6]/60 rounded-2xl border border-[#ded8ea] p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#53437b] text-white flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#53437b] uppercase tracking-wider">
              Objetivo Principal
            </span>
            <h4 className="text-[14px] font-extrabold text-[#1a1c1c]">{user.targetGoal}</h4>
          </div>
        </div>
      </div>

      {/* Badges / Conquistas */}
      <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs mb-4">
        <h3 className="text-sm font-bold text-[#1a1c1c] mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#53437b]" />
          <span>Conquistas Acadêmicas</span>
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-xl bg-[#f9f9fb] flex items-center gap-2.5">
            <span className="text-xl">🏆</span>
            <div>
              <h5 className="text-xs font-bold text-[#1a1c1c]">Foco Total</h5>
              <p className="text-[10px] text-[#666666]">7 dias seguidos de estudo</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f9f9fb] flex items-center gap-2.5">
            <span className="text-xl">📐</span>
            <div>
              <h5 className="text-xs font-bold text-[#1a1c1c]">Mestre em Funções</h5>
              <p className="text-[10px] text-[#666666]">+20 questões resolvidas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-[#e8e8e8] divide-y divide-[#f2f2f4] overflow-hidden mb-4">
        <button
          onClick={onViewMyGroups}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#f9f9fb] text-xs font-bold text-[#1a1c1c] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-[#53437b]" />
            <span>Gerenciar Meus Grupos</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#999999]" />
        </button>

        <button
          onClick={onLogout}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-red-50 text-xs font-bold text-red-600 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4 text-red-500" />
            <span>Sair da conta</span>
          </div>
        </button>
      </div>
    </div>
  );
};
