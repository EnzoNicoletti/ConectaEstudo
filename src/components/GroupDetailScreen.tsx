import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  Users,
  UserPlus,
  Target,
  CheckCircle2,
  Video,
  Star,
  Check,
} from 'lucide-react';
import { StudyGroup } from '../data/studyData';

interface GroupDetailScreenProps {
  group: StudyGroup;
  onBack: () => void;
  onToggleJoin: (group: StudyGroup) => void;
  onEnterVirtualRoom: (group: StudyGroup) => void;
}

export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = ({
  group,
  onBack,
  onToggleJoin,
  onEnterVirtualRoom,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f9f9f9] text-[#1a1c1c] pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md border-b border-[#e8e8e8]">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full text-[#1a1c1c] hover:bg-[#f3f3f3] transition-colors focus:outline-none cursor-pointer"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="font-extrabold text-[16px] text-[#1a1c1c]">
          Detalhes do Grupo
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-[#49454f] hover:bg-[#f3f3f3] transition-colors focus:outline-none cursor-pointer"
            aria-label="Compartilhar"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-colors focus:outline-none cursor-pointer ${
              isBookmarked ? 'text-[#53437b]' : 'text-[#49454f] hover:bg-[#f3f3f3]'
            }`}
            aria-label="Salvar"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#53437b]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {sharedToast && (
        <div className="mx-4 mt-2 p-2.5 rounded-xl bg-[#53437b] text-white text-[12px] font-semibold text-center shadow-md animate-fadeIn">
          Link do grupo copiado para a área de transferência!
        </div>
      )}

      <div className="p-4 space-y-4 max-w-lg mx-auto w-full">
        {/* Top Header Card */}
        <div className="bg-gradient-to-b from-[#f2eff8] to-white rounded-2xl border border-[#e8e8e8] p-5 shadow-[0_2px_12px_rgba(26,58,82,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#e8e8e8] flex items-center justify-center text-[#53437b] shadow-xs">
              <span className="text-2xl font-bold">📐</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e8e8e8] text-[#00716b] text-[11px] font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#4ecdc4]" />
              <span>{group.subject}</span>
            </div>
          </div>

          <h1 className="text-xl font-extrabold text-[#1a1c1c] leading-snug mb-1">
            {group.title}
          </h1>
          <p className="text-[13px] text-[#666666] leading-relaxed mb-3.5">
            {group.subtitle || 'Metodologia ativa, foco em questões-chave e nivelamento prático.'}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#f0ecf6] text-[#53437b] text-[11px] font-bold">
              <span>📐</span> {group.subjectCategory}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#f3f3f3] text-[#49454f] text-[11px] font-semibold">
              <span>📊</span> {group.level}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#e8f8f7] text-[#00716b] text-[11px] font-bold">
              <Video className="w-3.5 h-3.5 text-[#00716b]" />
              {group.mode}
            </span>
          </div>
        </div>

        {/* 4-Stat Grid Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Dias & Horários */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] p-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-[#f6f6f8] text-[#53437b] flex items-center justify-center mb-2">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[11px] text-[#666666] font-medium block">Dias & Horários</span>
            <span className="text-[13px] font-extrabold text-[#1a1c1c] block mt-0.5">
              {group.schedule}
            </span>
          </div>

          {/* Card 2: Participantes */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] p-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-[#f6f6f8] text-[#53437b] flex items-center justify-center mb-2">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] text-[#666666] font-medium block">Participantes</span>
            <span className="text-[13px] font-extrabold text-[#1a1c1c] block mt-0.5">
              {group.currentMembers} membros
            </span>
          </div>

          {/* Card 3: Vagas Restantes */}
          <div className="bg-[#eafaf8] rounded-2xl border border-[#c1f0eb] p-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-white text-[#00716b] flex items-center justify-center mb-2 shadow-2xs">
              <UserPlus className="w-4 h-4" />
            </div>
            <span className="text-[11px] text-[#00504c] font-semibold block">Vagas Restantes</span>
            <span className="text-[13px] font-extrabold text-[#00504c] block mt-0.5">
              {group.availableSpots} vagas abertas
            </span>
          </div>

          {/* Card 4: Objetivo */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] p-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-[#f6f6f8] text-[#53437b] flex items-center justify-center mb-2">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-[11px] text-[#666666] font-medium block">Objetivo</span>
            <span className="text-[13px] font-extrabold text-[#1a1c1c] block mt-0.5">
              {group.targetExam}
            </span>
          </div>
        </div>

        {/* Sobre este grupo */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-full bg-[#f0ecf6] text-[#53437b] flex items-center justify-center">
              <span className="text-xs font-bold">ℹ</span>
            </div>
            <h3 className="text-[15px] font-bold text-[#1a1c1c]">Sobre este grupo</h3>
          </div>

          <p className="text-[13px] text-[#49454f] leading-relaxed mb-4">
            {group.description}
          </p>

          {/* Key points */}
          <div className="space-y-2.5 pt-2 border-t border-[#f4f4f4]">
            {(
              group.highlights || [
                'Resolução guiada de provas anteriores',
                'Plantão de dúvidas semanal via Meet',
                'Grupo de WhatsApp exclusivo para troca de materiais',
              ]
            ).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e8f8f7] text-[#00716b] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[12.5px] text-[#333333] font-medium leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Organizador Responsável */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666666] block mb-2.5">
            Organizador Responsável
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={group.instructor.avatarUrl}
                alt={group.instructor.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14.5px] font-bold text-[#1a1c1c]">
                    {group.instructor.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-[#f0ecf6] text-[#53437b] text-[10px] font-bold">
                    {group.instructor.role}
                  </span>
                </div>
                <p className="text-[11.5px] text-[#666666] mt-0.5">
                  {group.instructor.institution}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#49454f]">
                  <div className="flex text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                  <span className="font-bold text-[#1a1c1c] ml-1">
                    {group.instructor.rating.toFixed(1)}
                  </span>
                  <span className="text-[#888888]">({group.instructor.reviewCount} avaliações)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8e8e8] p-4 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-md mx-auto space-y-2">
          {group.isJoined ? (
            <div className="flex gap-2">
              <button
                onClick={() => onEnterVirtualRoom(group)}
                className="flex-1 h-12 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white font-bold text-[14px] shadow-[0_4px_12px_rgba(83,67,123,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Entrar na Sala Virtual</span>
              </button>
              <button
                onClick={() => onToggleJoin(group)}
                className="px-4 h-12 rounded-xl bg-[#f3f3f3] hover:bg-red-50 text-[#666666] hover:text-red-600 font-bold text-[12px] transition-colors cursor-pointer"
                title="Sair do grupo"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => onToggleJoin(group)}
              className="w-full h-12 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white font-bold text-[15px] shadow-[0_4px_12px_rgba(83,67,123,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-5 h-5" />
              <span>Participar do Grupo</span>
            </button>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#00716b] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4ecdc4]" />
            <span>Acesso 100% gratuito • Vaga confirmada na hora</span>
          </div>
        </div>
      </div>
    </div>
  );
};
