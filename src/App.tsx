import React, { useState } from 'react';
import {
  initialCurrentUser,
  initialGroups,
  sampleNotifications,
  StudyGroup,
  UserProfile,
  NotificationItem,
} from './data/studyData';
import { HeaderTop } from './components/HeaderTop';
import { BottomNav, MainTab } from './components/BottomNav';
import { OnboardingScreen } from './components/OnboardingScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { GroupDetailScreen } from './components/GroupDetailScreen';
import { FilterModal } from './components/FilterModal';
import { MyGroupsScreen } from './components/MyGroupsScreen';
import { VirtualRoomModal } from './components/VirtualRoomModal';
import { MaterialModal } from './components/MaterialModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ContentsScreen } from './components/ContentsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ScreenSwitcherBar, ScreenId } from './components/ScreenSwitcherBar';

export default function App() {
  // App state
  const [user, setUser] = useState<UserProfile>(initialCurrentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [mainTab, setMainTab] = useState<MainTab>('inicio');
  const [groups, setGroups] = useState<StudyGroup[]>(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup>(initialGroups[0]);

  // Modals & Panels
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVirtualRoomOpen, setIsVirtualRoomOpen] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);

  // View frame mode: mobile container by default (390-420px) or responsive desktop
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Screen selection via top quick switcher

  // Toggle user membership in a group
  const handleToggleJoin = (groupToToggle: StudyGroup) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id === groupToToggle.id) {
          const willBeJoined = !g.isJoined;
          const updated = {
            ...g,
            isJoined: willBeJoined,
            currentMembers: willBeJoined ? g.currentMembers + 1 : Math.max(1, g.currentMembers - 1),
            availableSpots: willBeJoined ? Math.max(0, g.availableSpots - 1) : g.availableSpots + 1,
          };
          setSelectedGroup(updated);
          return updated;
        }
        return g;
      })
    );

    if (!groupToToggle.isJoined) {
      showToast(`🎉 Parabéns! Você ingressou no grupo "${groupToToggle.title}"!`);
    } else {
      showToast(`Você saiu do grupo "${groupToToggle.title}".`);
    }
  };

  // Open details for a specific group
  const handleOpenGroupDetail = (group: StudyGroup) => {
    setSelectedGroup(group);
    setCurrentScreen('detail');
  };

  // Enter virtual room
  const handleEnterVirtualRoom = (group: StudyGroup) => {
    setSelectedGroup(group);
    setIsVirtualRoomOpen(true);
  };

  // Login handler
  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUser({
      ...user,
      email: email,
      name: email.includes('sofia') ? 'Sofia' : email.split('@')[0],
    });
    setCurrentScreen('home');
    setMainTab('inicio');
    showToast(`Bem-vinda de volta!`);
  };

  // Register handler
  const handleRegisterSuccess = (data: { name: string; email: string; schoolLevel: string }) => {
    setIsLoggedIn(true);
    setUser({
      ...user,
      name: data.name,
      email: data.email,
      schoolLevel: data.schoolLevel,
    });
    setCurrentScreen('home');
    setMainTab('inicio');
    showToast(`Conta criada com sucesso! Seja bem-vindo(a), ${data.name}!`);
  };

  // Bottom navigation tab click
  const handleTabChange = (tab: MainTab) => {
    setMainTab(tab);
    if (tab === 'inicio') setCurrentScreen('home');
    else if (tab === 'explorar') setCurrentScreen('explore');
    else if (tab === 'meus-grupos') setCurrentScreen('my-groups');
    else setCurrentScreen('home'); // or keep main
  };

  // Unread notifications count
  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  // Render the core active screen
  const renderScreenContent = () => {
    // 1. Onboarding Screen
    if (currentScreen === 'onboarding') {
      return (
        <OnboardingScreen
          onStart={() => setCurrentScreen('register')}
          onGoLogin={() => setCurrentScreen('login')}
        />
      );
    }

    // 2. Login Screen
    if (currentScreen === 'login') {
      return (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onGoRegister={() => setCurrentScreen('register')}
        />
      );
    }

    // 3. Register Screen
    if (currentScreen === 'register') {
      return (
        <RegisterScreen
          onRegisterSuccess={handleRegisterSuccess}
          onGoLogin={() => setCurrentScreen('login')}
        />
      );
    }

    // 4. Group Detail Screen
    if (currentScreen === 'detail') {
      return (
        <GroupDetailScreen
          group={selectedGroup}
          onBack={() => {
            if (mainTab === 'explorar') setCurrentScreen('explore');
            else if (mainTab === 'meus-grupos') setCurrentScreen('my-groups');
            else setCurrentScreen('home');
          }}
          onToggleJoin={handleToggleJoin}
          onEnterVirtualRoom={handleEnterVirtualRoom}
        />
      );
    }

    // 5. Main authenticated views with Top Header and Bottom Navigation
    return (
      <div className="flex flex-col min-h-full">
        {/* Top Header */}
        <HeaderTop
          user={user}
          unreadCount={unreadNotifCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => setMainTab('perfil')}
          onLogoClick={() => {
            setMainTab('inicio');
            setCurrentScreen('home');
          }}
        />

        {/* Tab content */}
        <main className="flex-1">
          {mainTab === 'inicio' && (
            <HomeScreen
              user={user}
              groups={groups}
              onOpenGroupDetail={handleOpenGroupDetail}
              onEnterVirtualRoom={handleEnterVirtualRoom}
              onOpenFilter={() => setIsFilterOpen(true)}
              onViewAllMyGroups={() => {
                setMainTab('meus-grupos');
                setCurrentScreen('my-groups');
              }}
              onExploreMore={() => {
                setMainTab('explorar');
                setCurrentScreen('explore');
              }}
              onJoinGroup={handleToggleJoin}
            />
          )}

          {mainTab === 'explorar' && (
            <ExploreScreen
              groups={groups}
              activeFiltersCount={2}
              onOpenFilter={() => setIsFilterOpen(true)}
              onOpenGroupDetail={handleOpenGroupDetail}
            />
          )}

          {mainTab === 'meus-grupos' && (
            <MyGroupsScreen
              groups={groups}
              onOpenGroupDetail={handleOpenGroupDetail}
              onEnterVirtualRoom={handleEnterVirtualRoom}
              onOpenMaterialModal={(name) => setActiveMaterial(name)}
              onExploreMore={() => {
                setMainTab('explorar');
                setCurrentScreen('explore');
              }}
            />
          )}

          {mainTab === 'conteudos' && (
            <ContentsScreen onOpenMaterial={(title) => setActiveMaterial(title)} />
          )}

          {mainTab === 'perfil' && (
            <ProfileScreen
              user={user}
              onLogout={() => {
                setIsLoggedIn(false);
                setCurrentScreen('login');
                showToast('Você saiu da sua conta.');
              }}
              onViewMyGroups={() => {
                setMainTab('meus-grupos');
                setCurrentScreen('my-groups');
              }}
            />
          )}
        </main>

        {/* Fixed Bottom Dock Navigation */}
        <BottomNav
          activeTab={mainTab}
          onChangeTab={handleTabChange}
          myGroupsCount={groups.filter((g) => g.isJoined).length}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#eaecf2] flex flex-col font-sans antialiased text-[#1a1c1c]">
      {/* Top Demo Bar for Reviewing All Screens */}
      {/* Main Viewport Container */}
      <div className="flex-1 flex justify-center items-start py-0 sm:py-4 sm:px-4">
        <div
          className={`w-full transition-all duration-300 relative bg-[#f9f9f9] shadow-2xl flex flex-col ${
            isMobileFrame
              ? 'max-w-[420px] min-h-[840px] h-[92vh] max-h-[920px] rounded-none sm:rounded-[36px] border-0 sm:border-[8px] sm:border-[#1a1c1c] overflow-y-auto no-scrollbar ring-1 ring-black/5'
              : 'max-w-4xl min-h-[85vh] rounded-none sm:rounded-2xl border border-[#e2e2e8] overflow-hidden'
          }`}
        >
          {/* Subtle phone speaker & camera cutout on mobile frame */}
          {isMobileFrame && (
            <div className="hidden sm:flex justify-center items-center h-4 w-full bg-[#1a1c1c] shrink-0 sticky top-0 z-50">
              <div className="w-16 h-2 bg-[#2d2d2d] rounded-full" />
            </div>
          )}

          {/* Active Screen Content */}
          <div className="flex-1 flex flex-col relative">{renderScreenContent()}</div>
        </div>
      </div>

      {/* Global Interactive Modals */}
      {/* Filter Modal (Image 11) */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(applied) => {
          showToast(`Filtros atualizados para: ${applied.disciplina || 'Todas as disciplinas'}`);
        }}
      />

      {/* Virtual Room Meet (Live Room Modal) */}
      <VirtualRoomModal
        isOpen={isVirtualRoomOpen}
        group={selectedGroup}
        userName={user.name}
        onLeave={() => setIsVirtualRoomOpen(false)}
      />

      {/* Material Download / Preview Modal */}
      <MaterialModal
        isOpen={!!activeMaterial}
        materialName={activeMaterial || ''}
        onClose={() => setActiveMaterial(null)}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        notifications={notifications}
        onClose={() => setIsNotificationsOpen(false)}
        onClearAll={() => {
          setNotifications(notifications.map((n) => ({ ...n, unread: false })));
          showToast('Todas as notificações foram marcadas como lidas.');
        }}
        onSelectNotification={(item) => {
          setIsNotificationsOpen(false);
          if (item.type === 'meeting') {
            setIsVirtualRoomOpen(true);
          } else if (item.type === 'material') {
            setActiveMaterial('Resumo: Citoplasma & Membrana [PDF]');
          }
        }}
      />

      {/* Global Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1a1c1c] text-white text-[13px] font-bold shadow-xl border border-white/10 flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
