import React from 'react';
import { X, Bell, Check, Clock, Sparkles, BookOpen } from 'lucide-react';
import { NotificationItem } from '../data/studyData';

interface NotificationsModalProps {
  isOpen: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  onClearAll: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  notifications,
  onClose,
  onClearAll,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 backdrop-blur-xs pt-16 animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-2xl border border-[#e8e8e8] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e8e8e8] bg-[#f9f9fb]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#53437b]" />
            <h3 className="font-extrabold text-[15px] text-[#1a1c1c]">Notificações</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-[11px] font-bold text-[#53437b] hover:underline cursor-pointer"
            >
              Marcar lidas
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#666666] hover:bg-[#eaeaea] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-[#f2f2f4] overflow-y-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onSelectNotification(notif)}
              className={`p-3.5 flex items-start gap-3 hover:bg-[#f9f9fb] transition-colors cursor-pointer ${
                notif.unread ? 'bg-[#f6f3fa]/50' : 'bg-white'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#f0ecf6] text-[#53437b] flex items-center justify-center shrink-0 mt-0.5">
                {notif.type === 'meeting' && <Clock className="w-4 h-4 text-[#53437b]" />}
                {notif.type === 'material' && <BookOpen className="w-4 h-4 text-[#00716b]" />}
                {notif.type === 'xp' && <Sparkles className="w-4 h-4 text-amber-500" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="text-[13px] font-bold text-[#1a1c1c]">{notif.title}</h4>
                  <span className="text-[10px] text-[#999999]">{notif.time}</span>
                </div>
                <p className="text-[11.5px] text-[#666666] leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {notif.unread && (
                <span className="w-2 h-2 rounded-full bg-[#53437b] shrink-0 mt-2" />
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-8 text-center text-[#888888] text-xs">
              Nenhuma nova notificação.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
