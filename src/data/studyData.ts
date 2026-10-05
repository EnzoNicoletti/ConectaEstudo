export interface StudyGroup {
  id: string;
  title: string;
  subtitle?: string;
  subject: string;
  subjectCategory: 'Matemática' | 'Biologia' | 'História' | 'Física' | 'Química' | 'Redação' | 'Português';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  tags: string[];
  description: string;
  highlights?: string[];
  schedule: string;
  meetingTime: string;
  nextMeetingDate?: string;
  mode: 'Online ao vivo' | 'Online - Google Meet' | 'Presencial - São Paulo' | 'Remoto';
  locationDetail?: string;
  totalSpots: number;
  availableSpots: number;
  currentMembers: number;
  targetExam: string;
  progressPercent?: number;
  progressLabel?: string;
  hasNewMaterial?: boolean;
  materialName?: string;
  instructor: {
    name: string;
    role: string;
    institution: string;
    rating: number;
    reviewCount: number;
    avatarUrl: string;
  };
  membersAvatars: string[];
  isJoined?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  schoolLevel: string;
  xp: number;
  studyHours: number;
  streakDays: number;
  rank: number;
  avatarUrl: string;
  bio: string;
  targetGoal: string;
}

export const initialCurrentUser: UserProfile = {
  name: 'Sofia',
  email: 'sofia.estudante@conectaestudo.com.br',
  schoolLevel: 'Pré-Vestibular / Cursinho',
  xp: 1450,
  studyHours: 42,
  streakDays: 8,
  rank: 4,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  bio: 'Focada em Medicina na USP e Unicamp. Apaixonada por Biologia e praticando cálculo para gabaritar o ENEM!',
  targetGoal: 'ENEM 2026 - Medicina',
};

export const initialGroups: StudyGroup[] = [
  {
    id: 'mat-aplicada-enem',
    title: 'Matemática Aplicada & Cálculo ENEM',
    subtitle: 'Metodologia ativa, foco em questões-chave e nivelamento prático.',
    subject: 'Matemática & Funções',
    subjectCategory: 'Matemática',
    level: 'Avançado',
    tags: ['Matemática', 'ENEM & Vestibulares', 'Avançado'],
    description: 'Funções, trigonometria e resolução de questões de alta incidência. Grupo colaborativo com foco em exercícios com alto índice de recorrência na prova de Matemática. Revisamos conceitos essenciais, estratégias de agilidade e montagem de listas de revisão semanal.',
    highlights: [
      'Resolução guiada de provas anteriores',
      'Plantão de dúvidas semanal via Meet',
      'Grupo de WhatsApp exclusivo para troca de materiais',
    ],
    schedule: 'Ter e Qui às 19:30',
    meetingTime: 'Hoje às 19:00',
    nextMeetingDate: 'Hoje',
    mode: 'Online ao vivo',
    locationDetail: 'Google Meet • Sala do Grupo A',
    totalSpots: 16,
    availableSpots: 2,
    currentMembers: 14,
    targetExam: 'Foco ENEM 2026',
    progressPercent: 65,
    progressLabel: 'Encontro 8 de 12',
    isJoined: true,
    instructor: {
      name: 'Prof. Lucas Mendes',
      role: 'Monitor',
      institution: 'Graduando em Engenharia • USP',
      rating: 4.9,
      reviewCount: 38,
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    },
    membersAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'bio-celular-genetica',
    title: 'Biologia Celular & Genética',
    subtitle: 'Estudo aprofundado com foco nas provas da Fuvest e Unicamp.',
    subject: 'Genética & Citologia',
    subjectCategory: 'Biologia',
    level: 'Intermediário',
    tags: ['Biologia', 'Genética & Citologia', 'Intermediário'],
    description: 'Estudo aprofundado com foco nas provas da Fuvest e Unicamp. Mapeamento genético, divisão celular e organelas citoplasmáticas com mapas mentais estruturados.',
    highlights: [
      'Mapas mentais autorais em alta resolução',
      'Simulados temáticos com gabarito comentado',
      'Gravações disponibilizadas em pasta na nuvem',
    ],
    schedule: 'Sábados às 14:00',
    meetingTime: 'Amanhã às 15:30',
    nextMeetingDate: 'Amanhã',
    mode: 'Online ao vivo',
    locationDetail: 'Google Meet • Sala Bio 02',
    totalSpots: 15,
    availableSpots: 3,
    currentMembers: 12,
    targetExam: 'Fuvest & Unicamp 2026',
    hasNewMaterial: true,
    materialName: 'Resumo: Citoplasma & Membrana [PDF]',
    isJoined: true,
    instructor: {
      name: 'Dra. Mariana Rios',
      role: 'Tutora Convidada',
      institution: 'Mestrado em Ciências Biológicas • Unicamp',
      rating: 5.0,
      reviewCount: 42,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    membersAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'hist-geral-atualidades',
    title: 'História Geral & Atualidades',
    subtitle: 'Debates guiados e resolução prática de questões discursivas.',
    subject: 'Brasil & Mundo',
    subjectCategory: 'História',
    level: 'Intermediário',
    tags: ['História', 'Brasil & Mundo', 'Intermediário'],
    description: 'Debates guiados e resolução prática de questões discursivas sobre Guerras Mundiais, Guerra Fria, Geopolítica do Século XXI e Era Vargas.',
    highlights: [
      'Análise crítica dos principais acontecimentos geopolíticos',
      'Redação de argumentos históricos para citações',
      'Encontros presenciais com cafezinho e fichamentos',
    ],
    schedule: 'Seg e Qua às 18:00',
    meetingTime: 'Quarta-feira às 18:00',
    nextMeetingDate: 'Quarta-feira',
    mode: 'Presencial - São Paulo',
    locationDetail: 'Sala de Estudos 3B • Campus Sul',
    totalSpots: 12,
    availableSpots: 4,
    currentMembers: 8,
    targetExam: 'ENEM & Unesp',
    isJoined: true,
    instructor: {
      name: 'Prof. Thiago Ramos',
      role: 'Historiador',
      institution: 'Docente de História Moderna • PUC-SP',
      rating: 4.8,
      reviewCount: 29,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
    membersAvatars: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'calculo-diferencial',
    title: 'Cálculo Diferencial e Integral',
    subtitle: 'Limites, derivadas e aplicações práticas em física e modelagem.',
    subject: 'Cálculo Superior',
    subjectCategory: 'Matemática',
    level: 'Avançado',
    tags: ['Matemática', 'Cálculo I', 'Ensino Superior'],
    description: 'Para estudantes de Engenharia, Exatas e Economia. Abordagem passo a passo com resolução de listas do Guidorizzi e Stewart.',
    highlights: [
      'Nivelamento rápido pré-provas P1 e P2',
      'Gabaritos passo a passo em LaTeX',
      'Resolução ao vivo com tablet digitalizador',
    ],
    schedule: 'Terças e Quintas às 18:30',
    meetingTime: 'Terça às 18:30',
    mode: 'Online ao vivo',
    locationDetail: 'Google Meet • Sala Exatas 01',
    totalSpots: 20,
    availableSpots: 5,
    currentMembers: 15,
    targetExam: 'Graduação & Nivelamento',
    progressPercent: 50,
    progressLabel: 'Encontro 6 de 12',
    isJoined: false,
    instructor: {
      name: 'Gabriel Siqueira',
      role: 'Monitor Sênior',
      institution: 'Mestrando em Matemática Aplicada • Poli-USP',
      rating: 4.9,
      reviewCount: 51,
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    },
    membersAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'redacao-nota-1000',
    title: 'Redação Nota 1000 & Atualidades',
    subtitle: 'Estrutura dissertativa-argumentativa, repertório sociocultural e proposta de intervenção.',
    subject: 'Humanas / Redação',
    subjectCategory: 'Redação',
    level: 'Intermediário',
    tags: ['Redação', 'ENEM', 'Repertório'],
    description: 'Laboratório semanal de redação. Correção detalhada por competências do ENEM e repertórios coringa para qualquer tema.',
    highlights: [
      'Correções comentadas áudio + texto',
      'Banco com mais de 100 repertórios legitimados',
      'Treino prático com modelos de intervenção Nota 200',
    ],
    schedule: 'Sábados às 10h',
    meetingTime: 'Sábados às 10:00',
    mode: 'Online ao vivo',
    locationDetail: 'Google Meet • Auditório de Redação',
    totalSpots: 10,
    availableSpots: 4,
    currentMembers: 6,
    targetExam: 'ENEM 2026',
    isJoined: false,
    instructor: {
      name: 'Beatriz Vasconcelos',
      role: 'Corretora Certificada',
      institution: 'Letras • USP / Nota 1000 ENEM 2023',
      rating: 5.0,
      reviewCount: 64,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    },
    membersAvatars: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'fisica-mecanica-termo',
    title: 'Física Mecânica & Termodinâmica',
    subtitle: 'Cinemática, Dinâmica de Newton, Trabalho, Energia e Leis dos Gases.',
    subject: 'Exatas / Física',
    subjectCategory: 'Física',
    level: 'Iniciante',
    tags: ['Física', 'Exatas', 'Mecânica'],
    description: 'Desmistificando a física do Ensino Médio com intuição visual, esquemas gráficos e resolução das questões mais cobradas nos vestibulares.',
    highlights: [
      'Resumos visuais com fórmulas esquematizadas',
      'Lista dos 50 exercícios clássicos da Fuvest/ENEM',
      'Monitoria tira-dúvidas pós-encontro',
    ],
    schedule: 'Terças às 18h',
    meetingTime: 'Terças às 18:00',
    mode: 'Presencial - São Paulo',
    locationDetail: 'Biblioteca Central • Sala de Estudos 12',
    totalSpots: 8,
    availableSpots: 2,
    currentMembers: 6,
    targetExam: 'ENEM & Vestibulares Paulistas',
    isJoined: false,
    instructor: {
      name: 'Marcelo Brandão',
      role: 'Engenheiro & Monitor',
      institution: 'Engenharia Mecatrônica • Poli-USP',
      rating: 4.7,
      reviewCount: 22,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    membersAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'quimica-organica-enem',
    title: 'Química Orgânica & Soluções',
    subtitle: 'Funções orgânicas, isomeria e cálculos de concentração para o ENEM.',
    subject: 'Química Geral',
    subjectCategory: 'Química',
    level: 'Intermediário',
    tags: ['Química', 'Orgânica', 'ENEM'],
    description: 'Grupo focado nas 5 questões garantidas de química no ENEM: identificação de funções orgânicas, reações e estequiometria.',
    highlights: [
      'Macetes de nomenclatura sem decoreba',
      'Mapas de reações de esterificação e polímeros',
      'Exercícios cronometrados ao vivo',
    ],
    schedule: 'Quintas às 17:00',
    meetingTime: 'Quintas às 17:00',
    mode: 'Online ao vivo',
    locationDetail: 'Google Meet • Sala Química 01',
    totalSpots: 14,
    availableSpots: 5,
    currentMembers: 9,
    targetExam: 'ENEM 2026',
    isJoined: false,
    instructor: {
      name: 'Larissa Alencar',
      role: 'Professora de Química',
      institution: 'Licenciatura em Química • Unesp',
      rating: 4.9,
      reviewCount: 31,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    membersAvatars: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    ],
  },
];

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  category: string;
  format: 'PDF' | 'Flashcards' | 'Simulado' | 'Resumo';
  pagesOrCards: string;
  rating: number;
  downloads: number;
  author: string;
  date: string;
}

export const sampleMaterials: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Guia Completo: Funções Afim, Quadrática e Exponencial',
    subject: 'Matemática',
    category: 'Resumo Teórico + Exercícios',
    format: 'PDF',
    pagesOrCards: '24 páginas',
    rating: 4.9,
    downloads: 1240,
    author: 'Prof. Lucas Mendes',
    date: 'Ontem',
  },
  {
    id: 'bio-1',
    title: 'Citoplasma, Organelas e Transporte de Membrana',
    subject: 'Biologia',
    category: 'Citologia Fuvest/ENEM',
    format: 'PDF',
    pagesOrCards: '18 páginas',
    rating: 5.0,
    downloads: 980,
    author: 'Dra. Mariana Rios',
    date: 'Há 2 dias',
  },
  {
    id: 'red-1',
    title: '50 Citações Filosóficas Coringa para a Redação',
    subject: 'Redação',
    category: 'Repertório Sociocultural',
    format: 'Flashcards',
    pagesOrCards: '50 cartas interativas',
    rating: 4.9,
    downloads: 3410,
    author: 'Beatriz Vasconcelos',
    date: 'Esta semana',
  },
  {
    id: 'his-1',
    title: 'Linha do Tempo: Brasil República e Era Vargas',
    subject: 'História',
    category: 'História do Brasil',
    format: 'Resumo',
    pagesOrCards: '12 páginas',
    rating: 4.8,
    downloads: 720,
    author: 'Prof. Thiago Ramos',
    date: 'Semana passada',
  },
];

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'meeting' | 'material' | 'xp' | 'group';
}

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Encontro Hoje às 19:00!',
    message: 'A sala de "Matemática Aplicada & Cálculo ENEM" abre em instantes.',
    time: 'Há 15 min',
    unread: true,
    type: 'meeting',
  },
  {
    id: 'notif-2',
    title: 'Novo Material Publicado 📄',
    message: 'Dra. Mariana enviou "Resumo: Citoplasma & Membrana [PDF]".',
    time: 'Há 2 horas',
    unread: true,
    type: 'material',
  },
  {
    id: 'notif-3',
    title: 'Você subiu no Ranking! 🏆',
    message: 'Parabéns Sofia, você ganhou +350 XP e subiu para a 4ª posição!',
    time: 'Hoje cedo',
    unread: false,
    type: 'xp',
  },
];
