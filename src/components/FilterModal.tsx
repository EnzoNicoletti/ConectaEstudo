import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Tag, BarChart3, Clock, Target, Monitor, Check } from 'lucide-react';

interface FilterState {
  disciplina: string;
  assunto: string;
  nivel: string;
  horarios: string[];
  objetivo: string;
  modalidade: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    disciplina: 'Matemática',
    assunto: 'Qualquer assunto',
    nivel: 'Intermediário',
    horarios: ['Tarde', 'Noite'],
    objetivo: 'Preparação ENEM',
    modalidade: 'Online',
  });

  const [expandedSection, setExpandedSection] = useState<string>('disciplina');

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? '' : id);
  };

  const disciplinasList = ['Matemática', 'Biologia', 'História', 'Física', 'Química', 'Português'];
  const assuntosList = ['Qualquer assunto', 'Funções & Álgebra', 'Citologia', 'Genética', 'Brasil República', 'Mecânica Newtoniana', 'Termodinâmica', 'Redação Dissertativa'];
  const niveisList = ['Iniciante', 'Intermediário', 'Avançado'];
  const horariosList = ['Manhã', 'Tarde', 'Noite', 'Fim de semana'];
  const objetivosList = ['Preparação ENEM', 'Fuvest & Unicamp', 'Vestibulares Regionais', 'Reforço Ensino Médio', 'Graduação'];
  const modalidadesList = ['Online', 'Presencial', 'Híbrido'];

  // Count active filters
  const activeCount =
    (filters.disciplina ? 1 : 0) +
    (filters.assunto !== 'Qualquer assunto' ? 1 : 0) +
    (filters.nivel ? 1 : 0) +
    filters.horarios.length +
    (filters.objetivo ? 1 : 0) +
    (filters.modalidade ? 1 : 0);

  const toggleHorario = (h: string) => {
    if (filters.horarios.includes(h)) {
      setFilters({ ...filters, horarios: filters.horarios.filter((item) => item !== h) });
    } else {
      setFilters({ ...filters, horarios: [...filters.horarios, h] });
    }
  };

  const handleClear = () => {
    setFilters({
      disciplina: '',
      assunto: 'Qualquer assunto',
      nivel: '',
      horarios: [],
      objetivo: '',
      modalidade: '',
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f9f9f9] overflow-y-auto animate-fadeIn">
      {/* Top Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-[#e8e8e8]">
        <button
          onClick={onClose}
          className="p-2 -ml-2 rounded-full text-[#1a1c1c] hover:bg-[#f3f3f3] transition-colors focus:outline-none"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-[16px] text-[#1a1c1c]">Ajuste seu foco</span>
        <div className="w-8" /> {/* spacer */}
      </div>

      <div className="p-4 flex-1 max-w-lg mx-auto w-full space-y-3.5 pb-24">
        {/* Banner Section */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-[0_2px_8px_rgba(26,58,82,0.04)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f0ecf6] text-[#53437b] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[15px] font-extrabold text-[#1a1c1c]">Ajuste seu foco</h2>
              <p className="text-[12px] text-[#666666]">
                Encontre a sua turma ideal para o ritmo de hoje
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#53437b] text-white text-[11px] font-bold">
            {activeCount} ativos
          </span>
        </div>

        {/* 1. Disciplina Accordion */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <button
            onClick={() => toggleSection('disciplina')}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#53437b]" />
              <div>
                <h3 className="text-[14px] font-bold text-[#1a1c1c]">Disciplina</h3>
                <p className="text-[11.5px] text-[#666666]">
                  {filters.disciplina ? `${filters.disciplina} selecionada` : 'Todas'}
                </p>
              </div>
            </div>
            {expandedSection === 'disciplina' ? (
              <ChevronUp className="w-4 h-4 text-[#666666]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            )}
          </button>

          {expandedSection === 'disciplina' && (
            <div className="pt-3.5 mt-2 border-t border-[#f0f0f0] flex flex-wrap gap-2">
              {disciplinasList.map((item) => {
                const isSelected = filters.disciplina === item;
                return (
                  <button
                    key={item}
                    onClick={() => setFilters({ ...filters, disciplina: item })}
                    className={`px-3.5 py-1.5 rounded-xl text-[12.5px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#53437b] text-white shadow-xs'
                        : 'bg-[#f6f6f8] text-[#49454f] hover:bg-[#eaeaea]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Assunto ou Tópico */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <button
            onClick={() => toggleSection('assunto')}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-[#53437b]" />
              <div>
                <h3 className="text-[14px] font-bold text-[#1a1c1c]">Assunto ou Tópico</h3>
                <p className="text-[11.5px] text-[#666666]">{filters.assunto}</p>
              </div>
            </div>
            {expandedSection === 'assunto' ? (
              <ChevronUp className="w-4 h-4 text-[#666666]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            )}
          </button>

          {expandedSection === 'assunto' && (
            <div className="pt-3.5 mt-2 border-t border-[#f0f0f0] flex flex-wrap gap-2">
              {assuntosList.map((item) => {
                const isSelected = filters.assunto === item;
                return (
                  <button
                    key={item}
                    onClick={() => setFilters({ ...filters, assunto: item })}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#53437b] text-white shadow-xs'
                        : 'bg-[#f6f6f8] text-[#49454f] hover:bg-[#eaeaea]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Nível de Dificuldade */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <button
            onClick={() => toggleSection('nivel')}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-[#53437b]" />
              <div>
                <h3 className="text-[14px] font-bold text-[#1a1c1c]">Nível de Dificuldade</h3>
                <p className="text-[11.5px] text-[#666666]">{filters.nivel || 'Qualquer nível'}</p>
              </div>
            </div>
            {expandedSection === 'nivel' ? (
              <ChevronUp className="w-4 h-4 text-[#666666]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            )}
          </button>

          {expandedSection === 'nivel' && (
            <div className="pt-3.5 mt-2 border-t border-[#f0f0f0] flex gap-2">
              {niveisList.map((item) => {
                const isSelected = filters.nivel === item;
                return (
                  <button
                    key={item}
                    onClick={() => setFilters({ ...filters, nivel: item })}
                    className={`flex-1 py-2 rounded-xl text-[12.5px] font-semibold transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#53437b] text-white shadow-xs'
                        : 'bg-[#f6f6f8] text-[#49454f] hover:bg-[#eaeaea]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Horário Preferido */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <button
            onClick={() => toggleSection('horarios')}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#53437b]" />
              <div>
                <h3 className="text-[14px] font-bold text-[#1a1c1c]">Horário Preferido</h3>
                <p className="text-[11.5px] text-[#666666]">
                  {filters.horarios.length > 0
                    ? `${filters.horarios.join(', ')} (${filters.horarios.length} ativos)`
                    : 'Qualquer horário'}
                </p>
              </div>
            </div>
            {expandedSection === 'horarios' ? (
              <ChevronUp className="w-4 h-4 text-[#666666]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            )}
          </button>

          {expandedSection === 'horarios' && (
            <div className="pt-3.5 mt-2 border-t border-[#f0f0f0] grid grid-cols-2 gap-2">
              {horariosList.map((item) => {
                const isSelected = filters.horarios.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleHorario(item)}
                    className={`py-2 px-3 rounded-xl text-[12.5px] font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#53437b] text-white shadow-xs'
                        : 'bg-[#f6f6f8] text-[#49454f] hover:bg-[#eaeaea]'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Objetivo de Estudo */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <button
            onClick={() => toggleSection('objetivo')}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-[#53437b]" />
              <div>
                <h3 className="text-[14px] font-bold text-[#1a1c1c]">Objetivo de Estudo</h3>
                <p className="text-[11.5px] text-[#666666]">{filters.objetivo || 'Todos'}</p>
              </div>
            </div>
            {expandedSection === 'objetivo' ? (
              <ChevronUp className="w-4 h-4 text-[#666666]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            )}
          </button>

          {expandedSection === 'objetivo' && (
            <div className="pt-3.5 mt-2 border-t border-[#f0f0f0] flex flex-wrap gap-2">
              {objetivosList.map((item) => {
                const isSelected = filters.objetivo === item;
                return (
                  <button
                    key={item}
                    onClick={() => setFilters({ ...filters, objetivo: item })}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#53437b] text-white shadow-xs'
                        : 'bg-[#f6f6f8] text-[#49454f] hover:bg-[#eaeaea]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Modalidade */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-xs">
          <button
            onClick={() => toggleSection('modalidade')}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <Monitor className="w-4 h-4 text-[#53437b]" />
              <div>
                <h3 className="text-[14px] font-bold text-[#1a1c1c]">Modalidade</h3>
                <p className="text-[11.5px] text-[#666666]">{filters.modalidade || 'Todas'}</p>
              </div>
            </div>
            {expandedSection === 'modalidade' ? (
              <ChevronUp className="w-4 h-4 text-[#666666]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            )}
          </button>

          {expandedSection === 'modalidade' && (
            <div className="pt-3.5 mt-2 border-t border-[#f0f0f0] flex gap-2">
              {modalidadesList.map((item) => {
                const isSelected = filters.modalidade === item;
                return (
                  <button
                    key={item}
                    onClick={() => setFilters({ ...filters, modalidade: item })}
                    className={`flex-1 py-2 rounded-xl text-[12.5px] font-semibold transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#53437b] text-white shadow-xs'
                        : 'bg-[#f6f6f8] text-[#49454f] hover:bg-[#eaeaea]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 z-20 bg-white border-t border-[#e8e8e8] px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <button
          onClick={handleClear}
          className="text-[13.5px] font-bold text-[#666666] hover:text-[#1a1c1c] focus:outline-none cursor-pointer px-2"
        >
          Limpar filtros
        </button>

        <button
          onClick={handleApply}
          className="px-6 py-2.5 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white text-[13.5px] font-bold shadow-[0_4px_12px_rgba(83,67,123,0.25)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Aplicar filtros ({activeCount} ativos)</span>
        </button>
      </div>
    </div>
  );
};
