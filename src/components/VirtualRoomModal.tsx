import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  Hand,
  Clock,
  Send,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { StudyGroup } from '../data/studyData';

interface VirtualRoomModalProps {
  isOpen: boolean;
  group: StudyGroup;
  userName: string;
  onLeave: () => void;
}

export const VirtualRoomModal: React.FC<VirtualRoomModalProps> = ({
  isOpen,
  group,
  userName,
  onLeave,
}) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState<'chat' | 'notes'>('chat');

  // Pomodoro timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Chat state
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Prof. Lucas', text: 'Boa noite turma! Hoje vamos resolver 8 questões modelo ENEM de Funções.', time: '19:01' },
    { sender: 'Camila', text: 'Excelente! Eu estava com dúvida na questão 142 do caderno azul do ano passado.', time: '19:02' },
    { sender: 'Pedro', text: 'Também tive dificuldade no gráfico daquela exponencial.', time: '19:03' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Shared note
  const [notes, setNotes] = useState(
    '# Resumo do Encontro - Matemática & Funções\n\n1. Função Quadrática: Vértice V(-b/2a, -Δ/4a)\n2. Ponto de máximo x ponto de mínimo\n3. Macete do ENEM: Quando pedir tempo para altura máxima, calcular o X do vértice!\n4. Lista de exercícios da semana: páginas 34 a 38.'
  );

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        sender: userName,
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#121217] text-white">
      {/* Top Meeting Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#1e1e24] border-b border-[#2d2d38]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#53437b] flex items-center justify-center font-bold text-white text-sm">
            ∑
          </div>
          <div>
            <h2 className="text-[14.5px] font-bold text-white leading-tight">
              {group.title}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-[#9a9aa8]">
              <span className="w-2 h-2 rounded-full bg-[#4ecdc4] animate-pulse" />
              <span>4 participantes ao vivo</span>
              <span>•</span>
              <span>{group.locationDetail || 'Google Meet'}</span>
            </div>
          </div>
        </div>

        {/* Pomodoro Timer Bar */}
        <div className="flex items-center gap-2 bg-[#2a2a34] px-3 py-1.5 rounded-xl border border-[#3a3a46]">
          <Clock className="w-4 h-4 text-[#7cf6ec]" />
          <span className="font-mono font-bold text-sm text-[#7cf6ec]">
            {formatTimer(timerSeconds)}
          </span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1 text-white hover:text-[#7cf6ec] focus:outline-none"
            title={isTimerRunning ? 'Pausar' : 'Iniciar'}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(25 * 60);
            }}
            className="p-1 text-[#9a9aa8] hover:text-white focus:outline-none"
            title="Reiniciar Pomodoro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-3 grid grid-cols-2 gap-3 overflow-y-auto bg-[#16161c]">
          {/* User Video */}
          <div className="relative rounded-2xl overflow-hidden bg-[#24242e] border border-[#363644] flex items-center justify-center aspect-video">
            {videoOn ? (
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#53437b] flex items-center justify-center font-bold text-2xl text-white">
                {userName.charAt(0)}
              </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold flex items-center gap-1.5">
              <span>{userName} (Você)</span>
              {micOn ? <Mic className="w-3 h-3 text-[#4ecdc4]" /> : <MicOff className="w-3 h-3 text-red-400" />}
            </div>
            {handRaised && (
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-amber-500 text-black shadow-md animate-bounce">
                <Hand className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Instructor (Prof. Lucas Mendes) */}
          <div className="relative rounded-2xl overflow-hidden bg-[#24242e] border-2 border-[#53437b] flex items-center justify-center aspect-video shadow-[0_0_12px_rgba(83,67,123,0.3)]">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80"
              alt="Prof. Lucas Mendes"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold flex items-center gap-1.5">
              <span>Prof. Lucas Mendes</span>
              <span className="w-2 h-2 rounded-full bg-[#4ecdc4] animate-ping" />
            </div>
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#53437b] text-white text-[9.5px] font-bold">
              MONITOR
            </div>
          </div>

          {/* Peer 1: Camila */}
          <div className="relative rounded-2xl overflow-hidden bg-[#24242e] border border-[#363644] flex items-center justify-center aspect-video">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80"
              alt="Camila Rocha"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold flex items-center gap-1.5">
              <span>Camila Rocha</span>
              <MicOff className="w-3 h-3 text-red-400" />
            </div>
          </div>

          {/* Peer 2: Pedro */}
          <div className="relative rounded-2xl overflow-hidden bg-[#24242e] border border-[#363644] flex items-center justify-center aspect-video">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
              alt="Pedro Alcantara"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold flex items-center gap-1.5">
              <span>Pedro Alcantara</span>
              <Mic className="w-3 h-3 text-[#4ecdc4]" />
            </div>
          </div>
        </div>

        {/* Side Panel: Chat / Shared Notes */}
        <div className="w-full lg:w-80 bg-[#1e1e26] border-t lg:border-t-0 lg:border-l border-[#2d2d38] flex flex-col h-64 lg:h-auto">
          {/* Side Tabs */}
          <div className="flex border-b border-[#2d2d38]">
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                activeSideTab === 'chat'
                  ? 'text-[#7cf6ec] border-b-2 border-[#7cf6ec] bg-[#272732]'
                  : 'text-[#9a9aa8] hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat ao vivo</span>
            </button>
            <button
              onClick={() => setActiveSideTab('notes')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                activeSideTab === 'notes'
                  ? 'text-[#7cf6ec] border-b-2 border-[#7cf6ec] bg-[#272732]'
                  : 'text-[#9a9aa8] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Notas Colaborativas</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeSideTab === 'chat' ? (
            <div className="flex-1 flex flex-col p-3 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {chatMessages.map((msg, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center justify-between text-[#888899] text-[10.5px] mb-0.5">
                      <span className="font-bold text-[#c9c9d4]">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#292936] text-[#e0e0ea] leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="mt-2 flex gap-1.5">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Enviar mensagem no chat..."
                  className="flex-1 h-9 px-3 rounded-xl bg-[#292936] border border-[#3b3b4a] text-xs text-white placeholder:text-[#777788] focus:outline-none focus:border-[#7cf6ec]"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-xl bg-[#53437b] hover:bg-[#6b5b95] text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 p-3 flex flex-col">
              <span className="text-[11px] text-[#9a9aa8] mb-1">
                Documento compartilhado em tempo real com todos da sala:
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex-1 w-full p-2.5 rounded-xl bg-[#292936] border border-[#3b3b4a] text-xs font-mono text-[#e0e0ea] leading-relaxed resize-none focus:outline-none focus:border-[#7cf6ec]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Meeting Controls */}
      <footer className="px-4 py-3 bg-[#1e1e24] border-t border-[#2d2d38] flex items-center justify-center gap-3">
        {/* Toggle Mic */}
        <button
          onClick={() => setMicOn(!micOn)}
          className={`p-3 rounded-2xl transition-colors cursor-pointer ${
            micOn ? 'bg-[#2e2e3a] hover:bg-[#3d3d4e] text-white' : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}
          title={micOn ? 'Desativar microfone' : 'Ativar microfone'}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        {/* Toggle Video */}
        <button
          onClick={() => setVideoOn(!videoOn)}
          className={`p-3 rounded-2xl transition-colors cursor-pointer ${
            videoOn ? 'bg-[#2e2e3a] hover:bg-[#3d3d4e] text-white' : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}
          title={videoOn ? 'Desligar câmera' : 'Ligar câmera'}
        >
          {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Raise Hand */}
        <button
          onClick={() => setHandRaised(!handRaised)}
          className={`p-3 rounded-2xl transition-colors cursor-pointer ${
            handRaised ? 'bg-amber-500 text-black font-bold' : 'bg-[#2e2e3a] hover:bg-[#3d3d4e] text-white'
          }`}
          title={handRaised ? 'Abaixar mão' : 'Levantar a mão'}
        >
          <Hand className="w-5 h-5" />
        </button>

        {/* Leave Room Button */}
        <button
          onClick={onLeave}
          className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all ml-2"
        >
          <PhoneOff className="w-4 h-4" />
          <span>Sair da Sala</span>
        </button>
      </footer>
    </div>
  );
};
