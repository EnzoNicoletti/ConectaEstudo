import React, { useState } from 'react';
import { Search, FileText, Download, Star, Filter, Sparkles, BookOpen } from 'lucide-react';
import { sampleMaterials, StudyMaterial } from '../data/studyData';

interface ContentsScreenProps {
  onOpenMaterial: (title: string) => void;
}

export const ContentsScreen: React.FC<ContentsScreenProps> = ({ onOpenMaterial }) => {
  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('Todos');

  const filteredMaterials = sampleMaterials.filter((m) => {
    const matchSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchFormat = selectedFormat === 'Todos' || m.format === selectedFormat;
    return matchSearch && matchFormat;
  });

  return (
    <div className="flex flex-col pb-20 px-4 pt-4">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1a1c1c]">
          Conteúdos
        </h1>
        <span className="px-2.5 py-1 rounded-full bg-[#f0ecf6] text-[#53437b] text-[11px] font-bold">
          Biblioteca
        </span>
      </div>
      <p className="text-[13px] text-[#666666] mb-4">
        Materiais, mapas mentais, resumos e flashcards dos seus grupos
      </p>

      {/* Search */}
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7580]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar resumos, simulados, fórmulas..."
          className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#e8e8e8] bg-white text-[13px] text-[#1a1c1c] placeholder:text-[#999999] shadow-xs focus:outline-none focus:border-[#53437b]"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-3">
        {['Todos', 'PDF', 'Flashcards', 'Resumo', 'Simulado'].map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFormat === fmt
                ? 'bg-[#53437b] text-white'
                : 'bg-white border border-[#e8e8e8] text-[#666666] hover:bg-[#f3f3f3]'
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Material List */}
      <div className="space-y-3">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs flex flex-col gap-2 hover:border-[#53437b]/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#53437b]">
                {mat.subject} • {mat.category}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#f0ecf6] text-[#53437b] text-[10px] font-bold">
                {mat.format}
              </span>
            </div>

            <h3
              onClick={() => onOpenMaterial(mat.title)}
              className="text-[14.5px] font-bold text-[#1a1c1c] hover:text-[#53437b] cursor-pointer"
            >
              {mat.title}
            </h3>

            <div className="flex items-center justify-between pt-2 border-t border-[#f4f4f4] text-xs text-[#666666]">
              <div className="flex items-center gap-3">
                <span>{mat.pagesOrCards}</span>
                <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {mat.rating}
                </span>
                <span>{mat.downloads} downloads</span>
              </div>

              <button
                onClick={() => onOpenMaterial(mat.title)}
                className="p-1.5 rounded-lg bg-[#f6f6f8] hover:bg-[#53437b] text-[#53437b] hover:text-white transition-colors cursor-pointer"
                title="Acessar material"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
