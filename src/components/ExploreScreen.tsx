import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, Calendar, Users, MapPin, ChevronDown } from 'lucide-react';
import { StudyGroup } from '../data/studyData';

interface ExploreScreenProps {
  groups: StudyGroup[];
  activeFiltersCount?: number;
  onOpenFilter: () => void;
  onOpenGroupDetail: (group: StudyGroup) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  groups,
  activeFiltersCount = 2,
  onOpenFilter,
  onOpenGroupDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'recent' | 'spots' | 'members'>('recent');

  const categories = ['Todos', 'Matemática', 'Biologia', 'História', 'Física', 'Química'];

  // Filter groups
  const filteredGroups = groups.filter((g) => {
    const matchCat =
      selectedCategory === 'Todos' ||
      g.subjectCategory === selectedCategory ||
      g.tags.includes(selectedCategory);

    const matchSearch =
      !searchQuery ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.targetExam.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCat && matchSearch;
  });

  // Sort groups
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === 'spots') return a.availableSpots - b.availableSpots;
    if (sortBy === 'members') return b.currentMembers - a.currentMembers;
    return 0; // default order
  });

  return (
    <div className="flex flex-col pb-20 px-4 pt-4">
      {/* Title & Filter Trigger */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1a1c1c]">
            Explorar Grupos
          </h1>
          <p className="text-[13px] text-[#666666] mt-0.5 max-w-[240px]">
            Encontre turmas abertas para o seu ritmo de estudos
          </p>
        </div>

        {/* Filter Button with badge */}
        <button
          onClick={onOpenFilter}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8e8e8] shadow-xs text-[#53437b] text-[12px] font-bold hover:bg-[#f9f9f9] transition-all cursor-pointer focus:outline-none"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#53437b]" />
          <span>Filtros</span>
          <span className="w-4 h-4 rounded-full bg-[#53437b] text-white text-[10px] flex items-center justify-center font-bold">
            {activeFiltersCount}
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-3.5 mb-2.5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7580]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar disciplina, assunto ou vestibular..."
            className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#e8e8e8] bg-white text-[13.5px] text-[#1a1c1c] placeholder:text-[#999999] shadow-xs focus:outline-none focus:border-[#53437b] focus:ring-2 focus:ring-[#53437b]/15 transition-all"
          />
        </div>
      </div>

      {/* Category Horizontal Tags */}
      <div className="py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 mb-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-[12.5px] font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#53437b] text-white shadow-xs'
                  : 'bg-white border border-[#e8e8e8] text-[#49454f] hover:bg-[#f3f3f3]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Header with Count & Sort Selector */}
      <div className="flex items-center justify-between py-1 mb-2.5">
        <div className="flex items-center gap-1.5 text-[12px] text-[#666666]">
          <span className="font-semibold text-[#1a1c1c]">Grupos recomendados</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ecdc4]" />
          <span>{sortedGroups.length} disponíveis</span>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-[12px] font-semibold text-[#53437b] bg-transparent pr-4 py-1 appearance-none focus:outline-none cursor-pointer"
          >
            <option value="recent">Mais recentes</option>
            <option value="spots">Vagas abertas</option>
            <option value="members">Mais membros</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[#53437b] absolute right-0 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Group Cards List */}
      <div className="space-y-3.5">
        {sortedGroups.map((group) => {
          const isOnline = !group.mode.includes('Presencial');

          return (
            <div
              key={group.id}
              className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-[0_2px_10px_rgba(26,58,82,0.04)] flex flex-col gap-2.5 hover:border-[#53437b]/40 transition-all"
            >
              {/* Top Meta Tags & Online Badge */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Category Pill */}
                  <span className="px-2 py-0.5 rounded-md bg-[#f0ecf6] text-[#53437b] text-[10.5px] font-bold">
                    {group.subjectCategory}
                  </span>

                  {/* Secondary Tag */}
                  {group.tags[1] && (
                    <span className="px-2 py-0.5 rounded-md bg-[#f3f3f3] text-[#49454f] text-[10.5px] font-medium">
                      {group.tags[1]}
                    </span>
                  )}

                  {/* Level Tag */}
                  <span className="px-2 py-0.5 rounded-md bg-[#f3f3f3] text-[#666666] text-[10.5px] font-medium">
                    {group.level}
                  </span>
                </div>

                {/* Status Dot */}
                <div
                  className={`inline-flex items-center gap-1 text-[10.5px] font-bold ${
                    isOnline ? 'text-[#00716b]' : 'text-[#43617b]'
                  }`}
                >
                  {isOnline ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ecdc4]" />
                      <span>Online ao vivo</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3 h-3 text-[#43617b]" />
                      <span>Presencial - SP</span>
                    </>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  onClick={() => onOpenGroupDetail(group)}
                  className="text-[15.5px] font-extrabold text-[#1a1c1c] leading-snug hover:text-[#53437b] cursor-pointer transition-colors"
                >
                  {group.title}
                </h3>
                <p className="text-[12.5px] text-[#666666] mt-1 line-clamp-2 leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Schedule and Spots Box */}
              <div className="bg-[#f9f9fb] rounded-xl p-2.5 flex items-center justify-between text-[11.5px] text-[#49454f]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#53437b]" />
                  <span>{group.schedule}</span>
                </div>
                <div className="flex items-center gap-1 text-[#00716b] font-semibold">
                  <Users className="w-3.5 h-3.5 text-[#00716b]" />
                  <span>{group.availableSpots} vagas disponíveis</span>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => onOpenGroupDetail(group)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white text-[13px] font-bold shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Ver detalhes</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          );
        })}

        {sortedGroups.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#e8e8e8]">
            <p className="text-[14px] text-[#666666] mb-3">
              Nenhuma turma encontrada para os termos buscados.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
              }}
              className="px-4 py-2 rounded-xl bg-[#53437b] text-white text-[13px] font-bold"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
