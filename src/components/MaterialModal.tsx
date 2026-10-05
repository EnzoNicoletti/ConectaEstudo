import React from 'react';
import { X, Download, FileText, CheckCircle2, Bookmark, Share2 } from 'lucide-react';

interface MaterialModalProps {
  isOpen: boolean;
  materialName: string;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({
  isOpen,
  materialName,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-2xl border border-[#e8e8e8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e8e8e8] bg-[#f9f9fb]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#53437b] text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1a1c1c]">Material Didático</h3>
              <p className="text-[11px] text-[#666666]">Disponível para download</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#666666] hover:bg-[#eaeaea] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <span className="px-2 py-0.5 rounded-md bg-[#e8f8f7] text-[#00716b] text-[10.5px] font-bold">
              PDF OFICIAL
            </span>
            <h2 className="text-lg font-extrabold text-[#1a1c1c] mt-1.5 leading-snug">
              {materialName || 'Resumo: Citoplasma & Membrana Plasmática'}
            </h2>
            <p className="text-xs text-[#666666] mt-1">
              Material elaborado para preparação nos vestibulares da Fuvest, Unicamp e ENEM.
            </p>
          </div>

          {/* Key Topics List */}
          <div className="bg-[#f8f7fb] rounded-xl p-3.5 border border-[#eeeaf5] space-y-2">
            <h4 className="text-xs font-bold text-[#53437b]">Conteúdos inclusos neste material:</h4>
            <div className="space-y-1.5 text-xs text-[#333333]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4ecdc4]" />
                <span>Modelo Mosaico Fluido e Bicamada Fosfolipídica</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4ecdc4]" />
                <span>Transporte Ativo x Passivo (Osmose, Difusão Facilitada)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4ecdc4]" />
                <span>Organelas: Mitocôndria, Complexo de Golgi, Retículo e Lisossomos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4ecdc4]" />
                <span>15 Questões comentadas de provas oficiais anteriores</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#666666] pt-1">
            <span>Tamanho: 4.2 MB</span>
            <span>18 páginas • Formato PDF A4</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-[#e8e8e8] bg-[#f9f9fb] flex items-center gap-2.5">
          <button
            onClick={() => {
              alert(`Download do arquivo "${materialName}" iniciado com sucesso!`);
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#53437b] hover:bg-[#453667] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Arquivo Completo</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#e8e8e8] bg-white text-xs font-semibold text-[#49454f] hover:bg-[#f3f3f3] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
