import React, { useState } from 'react';
import {
  Video,
  FileText,
  Clock,
  MapPin,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Download,
} from 'lucide-react';
import { StudyGroup } from '../data/studyData';

interface MyGroupsScreenProps {
  groups: StudyGroup[];
  onOpenGroupDetail: (group: StudyGroup) => void;
  onEnterVirtualRoom: (group: StudyGroup) => void;
  onOpenMaterialModal: (materialName: string) => void;
  onExploreMore: () => void;
}

export const MyGroupsScreen: React.FC<MyGroupsScreenProps> = ({
  groups,
  onOpenGroupDetail,
  onEnterVirtualRoom,
  onOpenMaterialModal,
  onExploreMore,
}) => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  // Filter user's joined groups
  const joinedGroups = groups.filter((g) => g.isJoined);

  // The primary meeting today
  const nextUpGroup = joinedGroups.find((g) => g.nextMeetingDate === 'Hoje') || joinedGroups[0];
  const otherGroups = joinedGroups.filter((g) => g.id !== nextUpGroup?.id);

  return (
    <div className="flex flex-col pb-20 px-4 pt-4">
      {/* Title & Badge */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1a1c1c]">
          Meus Grupos
        </h1>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ecf6] text-[#53437b] text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#53437b]" />
          <span>{joinedGroups.length} ativos</span>
        </span>
      </div>

      <p className="text-[13px] text-[#666666] mb-4">
        Acompanhe seus estudos colaborativos e compromissos da semana
      </p>

      {/* Segmented Control: Em andamento / Concluídos */}
      <div className="bg-[#ededf2] p-1 rounded-2xl flex items-center mb-4">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`flex-1 py-2 text-[13px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'ongoing'
              ? 'bg-white text-[#1a1c1c] shadow-xs'
              : 'text-[#666666] hover:text-[#1a1c1c]'
          }`}
        >
          Em andamento ({joinedGroups.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-[13px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-white text-[#1a1c1c] shadow-xs'
              : 'text-[#666666] hover:text-[#1a1c1c]'
          }`}
        >
          Concluídos (0)
        </button>
      </div>

      {activeTab === 'completed' ? (
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-8 text-center text-[#666666]">
          <p className="text-[14px]">Nenhum grupo concluído no momento.</p>
          <p className="text-[12px] mt-1 text-[#888888]">
            Seus módulos finalizados serão arquivados aqui com os certificados de participação!
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {/* 1. Highlight Card (Next Meeting Today) */}
          {nextUpGroup && (
            <div className="relative overflow-hidden rounded-2xl border border-[#4ecdc4]/40 bg-gradient-to-br from-[#effcfb] via-white to-[#f4effa] p-4 shadow-[0_4px_16px_rgba(78,205,196,0.12)]">
              {/* Header status */}
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3ab7ad]/15 text-[#005652] text-[10.5px] font-bold">
                  <Clock className="w-3 h-3 text-[#00716b]" />
                  <span>Próximo Encontro Hoje!</span>
                </span>
                <span className="text-[11.5px] font-bold text-[#00716b] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4ecdc4] animate-ping" />
                  Hoje às 19:00
                </span>
              </div>

              {/* Title and details */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#53437b]">
                    {nextUpGroup.subjectCategory.toUpperCase()}
                  </span>
                  <h3
                    onClick={() => onOpenGroupDetail(nextUpGroup)}
                    className="text-[16px] font-extrabold text-[#1a1c1c] hover:text-[#53437b] cursor-pointer transition-colors"
                  >
                    {nextUpGroup.title}
                  </h3>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    {nextUpGroup.locationDetail || 'Google Meet • Sala do Grupo A'}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#f0ecf6] text-[#53437b] flex items-center justify-center font-bold text-lg shrink-0">
                  ∑
                </div>
              </div>

              {/* Big CTA Button */}
              <button
                onClick={() => onEnterVirtualRoom(nextUpGroup)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white font-bold text-[13.5px] shadow-[0_4px_12px_rgba(83,67,123,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Entrar na Sala Virtual</span>
              </button>
            </div>
          )}

          {/* Card 2: Cálculo Diferencial (Module Progress) */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-[0_2px_8px_rgba(26,58,82,0.04)]">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0ecf6] text-[#53437b] flex items-center justify-center font-bold text-xs">
                  ±
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1a1c1c]">Cálculo Diferencial</h3>
                  <p className="text-[11.5px] text-[#666666]">Terças e Quintas às 18:30</p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-[#e8f8f7] text-[#00716b] text-[10.5px] font-bold">
                Online
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 pt-3 border-t border-[#f4f4f4]">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-[#666666]">Progresso do Módulo</span>
                <span className="font-bold text-[#1a1c1c]">Encontro 6 de 12</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f0f0f2] overflow-hidden">
                <div className="h-full bg-[#53437b] rounded-full" style={{ width: '50%' }} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-3.5 pt-1">
              <button
                onClick={() =>
                  onEnterVirtualRoom(
                    nextUpGroup || groups[0]
                  )
                }
                className="flex-1 py-2 px-3 rounded-xl bg-[#f0ecf6] hover:bg-[#e6e0f0] text-[#53437b] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Acessar sala</span>
              </button>

              <button
                onClick={() => onOpenGroupDetail(groups[3] || groups[0])}
                className="flex-1 py-2 px-3 rounded-xl bg-[#f9f9fb] hover:bg-[#f0f0f2] text-[#49454f] text-[12px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
              >
                <span>Ver detalhes</span>
              </button>
            </div>
          </div>

          {/* Card 3: Biologia Celular (New material alert) */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-[0_2px_8px_rgba(26,58,82,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#e8f8f7] text-[#00716b] flex items-center justify-center font-bold text-xs">
                  🔬
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1a1c1c]">Biologia Celular</h3>
                  <p className="text-[11.5px] text-[#666666]">Sábados às 14:00 • Remoto</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e8f8f7] text-[#00716b] text-[10.5px] font-bold">
                <FileText className="w-3 h-3 text-[#4ecdc4]" />
                <span>Material novo</span>
              </span>
            </div>

            {/* Material attachment box */}
            <div
              onClick={() => onOpenMaterialModal('Resumo: Citoplasma & Membrana [PDF]')}
              className="mt-2 p-2.5 rounded-xl bg-[#f9f9fb] border border-[#e8e8e8] flex items-center justify-between hover:bg-[#f2f2f6] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#53437b]" />
                <span className="text-[12px] font-medium text-[#1a1c1c]">
                  Resumo: Citoplasma & Membrana
                </span>
              </div>
              <span className="text-[10.5px] font-extrabold text-[#53437b] bg-white px-2 py-0.5 rounded-md border border-[#e8e8e8]">
                PDF
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-3 pt-1">
              <button
                onClick={() => onOpenMaterialModal('Resumo: Citoplasma & Membrana [PDF]')}
                className="flex-1 py-2 px-3 rounded-xl bg-[#f0ecf6] hover:bg-[#e6e0f0] text-[#53437b] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Acessar materiais</span>
              </button>

              <button
                onClick={() => onOpenGroupDetail(groups[1] || groups[0])}
                className="px-4 py-2 rounded-xl bg-[#f9f9fb] hover:bg-[#f0f0f2] text-[#49454f] text-[12px] font-semibold transition-colors cursor-pointer"
              >
                <span>Detalhes</span>
              </button>
            </div>
          </div>

          {/* Card 4: História Contemporânea (Presential meeting) */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-[0_2px_8px_rgba(26,58,82,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0ecf6] text-[#53437b] flex items-center justify-center font-bold text-xs">
                  🏛️
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1a1c1c]">História Contemporânea</h3>
                  <p className="text-[11.5px] text-[#666666]">
                    Quarta-feira às 18:00 • Presencial
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#49454f] text-[10.5px] font-medium">
                Quarta-feira
              </span>
            </div>

            <div className="flex items-center justify-between text-[11.5px] text-[#666666] pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#53437b]" />
                <span>Sala de Estudos 3B • Campus Sul</span>
              </div>
              <span className="font-medium text-[#1a1c1c]">8 integrantes</span>
            </div>

            <button
              onClick={() => onOpenGroupDetail(groups[2] || groups[0])}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-[#f9f9fb] hover:bg-[#f0f0f2] text-[#49454f] text-[12px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Ver detalhes do grupo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Promo Card: "Buscando novos desafios?" */}
          <div className="rounded-2xl bg-gradient-to-r from-[#f0ecf6] via-[#f7f5fa] to-[#e8f8f7] p-4 border border-[#e8e8e8] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#53437b] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[13.5px] font-extrabold text-[#1a1c1c] leading-tight">
                  Buscando novos desafios?
                </h4>
                <p className="text-[11.5px] text-[#666666] mt-0.5 leading-tight">
                  Descubra novos grupos na sua universidade
                </p>
              </div>
            </div>

            <button
              onClick={onExploreMore}
              className="px-3.5 py-2 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white text-[12px] font-bold shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              + Explorar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
