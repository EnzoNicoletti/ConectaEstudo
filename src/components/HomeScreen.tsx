import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, ExternalLink, Sparkles, Clock, Calendar, ChevronRight } from 'lucide-react';
import { StudyGroup, UserProfile } from '../data/studyData';

interface HomeScreenProps {
  user: UserProfile;
  groups: StudyGroup[];
  onOpenGroupDetail: (group: StudyGroup) => void;
  onEnterVirtualRoom: (group: StudyGroup) => void;
  onOpenFilter: () => void;
  onViewAllMyGroups: () => void;
  onExploreMore: () => void;
  onJoinGroup: (group: StudyGroup) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  groups,
  onOpenGroupDetail,
  onEnterVirtualRoom,
  onOpenFilter,
  onViewAllMyGroups,
  onExploreMore,
  onJoinGroup,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = [
    { id: 'Todos', label: 'Todos', icon: '✨' },
    { id: 'Matemática', label: 'Matemática', icon: '∑' },
    { id: 'Biologia', label: 'Biologia', icon: '🔬' },
    { id: 'Redação', label: 'Redação', icon: '✍️' },
    { id: 'História', label: 'História', icon: '🏛️' },
    { id: 'Física', label: 'Física', icon: '⚡' },
    { id: 'Química', label: 'Química', icon: '🧪' },
  ];

  // User's active joined groups
  const myActiveGroups = groups.filter((g) => g.isJoined).slice(0, 2);

  // Recommended groups (unjoined)
  const recommendedGroups = groups
    .filter((g) => !g.isJoined)
    .filter(
      (g) =>
        selectedCategory === 'Todos' ||
        g.subjectCategory === selectedCategory ||
        g.tags.includes(selectedCategory)
    )
    .filter(
      (g) =>
        !searchQuery ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col pb-20">
      {/* Greeting Section */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-12 h-12 rounded-xl object-cover border border-[#e8e8e8] shadow-xs"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4ecdc4] rounded-full ring-2 ring-white" />
        </div>
        <div>
          <h2 className="text-[18px] font-extrabold text-[#1a1c1c] leading-tight flex items-center gap-1.5">
            Olá, {user.name} <span className="animate-wiggle inline-block">👋</span>
          </h2>
          <p className="text-[12.5px] text-[#666666] mt-0.5">
            Bora aprender juntos e bater suas metas?
          </p>
        </div>
      </div>

      {/* Hero Promo Banner */}
      <div className="px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#53437b] via-[#4d3d75] to-[#256372] p-5 text-white shadow-[0_8px_24px_rgba(83,67,123,0.22)]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top category label & XP box */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-white">
              <Sparkles className="w-3 h-3 text-[#7cf6ec]" />
              <span>Acelere seus estudos</span>
            </div>

            {/* XP Box */}
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-2.5 py-1.5 text-center flex flex-col items-center">
              <span className="text-[11px] font-black text-[#7cf6ec] leading-none">+350 XP</span>
              <span className="text-[9px] text-white/80 font-medium mt-0.5">Nível 8</span>
            </div>
          </div>

          <h3 className="text-[17px] font-extrabold leading-snug max-w-[240px] mb-1.5 text-white">
            Estude em grupo e multiplique seus pontos
          </h3>
          <p className="text-[12px] text-white/85 max-w-[260px] leading-relaxed mb-4">
            Conecte mentes, tire dúvidas ao vivo e alcance melhores resultados nos vestibulares.
          </p>

          <button
            onClick={onExploreMore}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#53437b] font-bold text-[13px] hover:bg-[#f3f3f3] active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>Encontrar grupo</span>
            <ArrowRight className="w-4 h-4 text-[#53437b]" />
          </button>
        </div>
      </div>

      {/* Search Bar with Filter Button */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7580]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você quer estudar hoje?"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#e8e8e8] bg-white text-[13.5px] text-[#1a1c1c] placeholder:text-[#999999] shadow-xs focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
            />
          </div>

          {/* Filter button */}
          <button
            onClick={onOpenFilter}
            className="w-11 h-11 rounded-xl bg-white border border-[#e8e8e8] flex items-center justify-center text-[#53437b] hover:bg-[#f9f9f9] shadow-xs transition-colors shrink-0 focus:outline-none"
            title="Ajustar filtros de estudo"
          >
            <SlidersHorizontal className="w-5 h-5 text-[#53437b]" />
          </button>
        </div>
      </div>

      {/* Category Pills (Horizontal scrolling) */}
      <div className="py-2 overflow-x-auto no-scrollbar px-4 flex items-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12.5px] font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#53437b] text-white shadow-xs'
                  : 'bg-white border border-[#e8e8e8] text-[#49454f] hover:bg-[#f3f3f3]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Meus Grupos Section */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-bold text-[#1a1c1c]">Meus Grupos</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#f0ecf6] text-[#53437b] text-[11px] font-bold">
              {myActiveGroups.length} ativos
            </span>
          </div>
          <button
            onClick={onViewAllMyGroups}
            className="text-[12px] font-semibold text-[#53437b] hover:underline flex items-center gap-0.5 focus:outline-none"
          >
            <span>Ver todos (3)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {myActiveGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl border border-[#e8e8e8] p-3.5 shadow-[0_2px_8px_rgba(26,58,82,0.04)] flex flex-col gap-2.5 hover:border-[#53437b]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f0ecf6] text-[#53437b] flex items-center justify-center font-bold text-[15px]">
                    {group.subjectCategory === 'Matemática' ? '∑' : '🔬'}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#53437b]">
                      {group.subjectCategory.toUpperCase()}
                    </span>
                    <h4
                      onClick={() => onOpenGroupDetail(group)}
                      className="text-[14px] font-bold text-[#1a1c1c] hover:text-[#53437b] cursor-pointer transition-colors"
                    >
                      {group.title.length > 28 ? group.title.substring(0, 26) + '...' : group.title}
                    </h4>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e8f8f7] text-[#00716b] text-[10.5px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ecdc4]" />
                  <span>Online</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#f0f0f0]">
                <div className="flex items-center gap-1.5 text-[11.5px] text-[#666666]">
                  <Clock className="w-3.5 h-3.5 text-[#53437b]" />
                  <span>{group.meetingTime}</span>
                </div>

                <button
                  onClick={() => onEnterVirtualRoom(group)}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#53437b] hover:text-[#453667] focus:outline-none"
                >
                  <span>Acessar sala</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendados para Você Section */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-baseline justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#53437b]" />
            <h3 className="text-[16px] font-bold text-[#1a1c1c]">Recomendados para Você</h3>
          </div>
          <span className="text-[11px] text-[#666666]">Baseado no seu curso</span>
        </div>

        <div className="space-y-3">
          {recommendedGroups.slice(0, 3).map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-[0_2px_8px_rgba(26,58,82,0.04)] flex flex-col gap-2 hover:border-[#53437b]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#43617b]">
                  {group.subject}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e8f8f7] text-[#00716b] text-[10.5px] font-bold">
                  {group.availableSpots} vagas
                </span>
              </div>

              <h4
                onClick={() => onOpenGroupDetail(group)}
                className="text-[14.5px] font-bold text-[#1a1c1c] hover:text-[#53437b] cursor-pointer transition-colors"
              >
                {group.title}
              </h4>

              <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#f4f4f4]">
                <div className="flex items-center gap-1.5 text-[11.5px] text-[#666666]">
                  <Calendar className="w-3.5 h-3.5 text-[#53437b]" />
                  <span>
                    {group.schedule} • {group.mode.includes('Presencial') ? 'Presencial' : 'Online'}
                  </span>
                </div>

                <button
                  onClick={() => onJoinGroup(group)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white text-[12px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  Quero Entrar
                </button>
              </div>
            </div>
          ))}

          {recommendedGroups.length === 0 && (
            <div className="p-6 text-center bg-white rounded-2xl border border-[#e8e8e8] text-[13px] text-[#666666]">
              Nenhum grupo encontrado nesta categoria.{' '}
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="text-[#53437b] font-bold underline ml-1"
              >
                Ver todos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
