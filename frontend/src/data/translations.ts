// Multi-language Support for WonderWordQuest
// Supported: English, Italian, Spanish, French, German, Portuguese

export type Language = 'en' | 'it' | 'es' | 'fr' | 'de' | 'pt';

export interface Translations {
  // App General
  appName: string;
  play: string;
  settings: string;
  back: string;
  close: string;
  confirm: string;
  cancel: string;
  yes: string;
  no: string;
  ok: string;
  
  // Home Screen
  currentCategory: string;
  level: string;
  progress: string;
  dailyChallenge: string;
  dailyRewards: string;
  achievements: string;
  leaderboard: string;
  statistics: string;
  watchAd: string;
  
  // Game Screen
  hint: string;
  shuffle: string;
  clear: string;
  undo: string;
  bonusWords: string;
  wordsFound: string;
  tapToSubmit: string;
  
  // Game Modes
  zenMode: string;
  speedMode: string;
  endlessMode: string;
  timeChallenge: string;
  classicMode: string;
  
  // Feedback
  excellent: string[];
  good: string[];
  bonus: string[];
  tryAgain: string;
  
  // Level Complete
  levelComplete: string;
  congratulations: string;
  wordsFoundCount: string;
  bonusWordsCount: string;
  coinsEarned: string;
  nextLevel: string;
  doubleReward: string;
  
  // Settings
  sound: string;
  music: string;
  language: string;
  notifications: string;
  rateApp: string;
  shareApp: string;
  privacyPolicy: string;
  termsOfService: string;
  
  // Categories
  basics: string;
  nature: string;
  animals: string;
  food: string;
  home: string;
  sports: string;
  science: string;
  expert: string;
}

const translations: Record<Language, Translations> = {
  // ENGLISH
  en: {
    appName: 'WonderWordQuest',
    play: 'PLAY',
    settings: 'Settings',
    back: 'Back',
    close: 'Close',
    confirm: 'Confirm',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    
    currentCategory: 'CURRENT CATEGORY',
    level: 'Level',
    progress: 'Progress',
    dailyChallenge: 'Daily Challenge',
    dailyRewards: 'Daily Rewards',
    achievements: 'Achievements',
    leaderboard: 'Leaderboard',
    statistics: 'Statistics',
    watchAd: 'Watch Ad',
    
    hint: 'Hint',
    shuffle: 'Shuffle',
    clear: 'Clear',
    undo: 'Undo',
    bonusWords: 'Bonus Words',
    wordsFound: 'Words Found',
    tapToSubmit: 'TAP TO SUBMIT',
    
    zenMode: 'Zen Mode',
    speedMode: 'Speed Mode',
    endlessMode: 'Endless Mode',
    timeChallenge: 'Time Challenge',
    classicMode: 'Classic Mode',
    
    excellent: ['Excellent!', 'Amazing!', 'Brilliant!', 'Fantastic!', 'Superb!', 'Outstanding!', 'Perfect!'],
    good: ['Good!', 'Nice!', 'Great!', 'Well done!', 'Correct!'],
    bonus: ['Bonus!', 'Extra Points!', 'Hidden Word!', 'Secret Find!'],
    tryAgain: 'Try Again',
    
    levelComplete: 'Level Complete!',
    congratulations: 'Congratulations!',
    wordsFoundCount: 'Words Found',
    bonusWordsCount: 'Bonus Words',
    coinsEarned: 'Coins Earned',
    nextLevel: 'Next Level',
    doubleReward: 'Double Reward',
    
    sound: 'Sound',
    music: 'Music',
    language: 'Language',
    notifications: 'Notifications',
    rateApp: 'Rate App',
    shareApp: 'Share App',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    
    basics: 'Basics',
    nature: 'Nature',
    animals: 'Animals',
    food: 'Food',
    home: 'Home',
    sports: 'Sports',
    science: 'Science',
    expert: 'Expert',
  },
  
  // ITALIAN
  it: {
    appName: 'WonderWordQuest',
    play: 'GIOCA',
    settings: 'Impostazioni',
    back: 'Indietro',
    close: 'Chiudi',
    confirm: 'Conferma',
    cancel: 'Annulla',
    yes: 'Sì',
    no: 'No',
    ok: 'OK',
    
    currentCategory: 'CATEGORIA ATTUALE',
    level: 'Livello',
    progress: 'Progresso',
    dailyChallenge: 'Sfida Giornaliera',
    dailyRewards: 'Premi Giornalieri',
    achievements: 'Obiettivi',
    leaderboard: 'Classifica',
    statistics: 'Statistiche',
    watchAd: 'Guarda Video',
    
    hint: 'Suggerimento',
    shuffle: 'Mescola',
    clear: 'Cancella',
    undo: 'Annulla',
    bonusWords: 'Parole Bonus',
    wordsFound: 'Parole Trovate',
    tapToSubmit: 'TOCCA PER INVIARE',
    
    zenMode: 'Modalità Zen',
    speedMode: 'Modalità Velocità',
    endlessMode: 'Modalità Infinita',
    timeChallenge: 'Sfida a Tempo',
    classicMode: 'Modalità Classica',
    
    excellent: ['Eccellente!', 'Fantastico!', 'Brillante!', 'Magnifico!', 'Superbo!', 'Perfetto!'],
    good: ['Bene!', 'Ottimo!', 'Bravo!', 'Ben fatto!', 'Corretto!'],
    bonus: ['Bonus!', 'Punti Extra!', 'Parola Nascosta!', 'Scoperta Segreta!'],
    tryAgain: 'Riprova',
    
    levelComplete: 'Livello Completato!',
    congratulations: 'Congratulazioni!',
    wordsFoundCount: 'Parole Trovate',
    bonusWordsCount: 'Parole Bonus',
    coinsEarned: 'Monete Guadagnate',
    nextLevel: 'Prossimo Livello',
    doubleReward: 'Raddoppia Premio',
    
    sound: 'Suoni',
    music: 'Musica',
    language: 'Lingua',
    notifications: 'Notifiche',
    rateApp: 'Valuta App',
    shareApp: 'Condividi App',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Termini di Servizio',
    
    basics: 'Base',
    nature: 'Natura',
    animals: 'Animali',
    food: 'Cibo',
    home: 'Casa',
    sports: 'Sport',
    science: 'Scienza',
    expert: 'Esperto',
  },
  
  // SPANISH
  es: {
    appName: 'WonderWordQuest',
    play: 'JUGAR',
    settings: 'Ajustes',
    back: 'Atrás',
    close: 'Cerrar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    yes: 'Sí',
    no: 'No',
    ok: 'OK',
    
    currentCategory: 'CATEGORÍA ACTUAL',
    level: 'Nivel',
    progress: 'Progreso',
    dailyChallenge: 'Desafío Diario',
    dailyRewards: 'Recompensas Diarias',
    achievements: 'Logros',
    leaderboard: 'Clasificación',
    statistics: 'Estadísticas',
    watchAd: 'Ver Anuncio',
    
    hint: 'Pista',
    shuffle: 'Mezclar',
    clear: 'Borrar',
    undo: 'Deshacer',
    bonusWords: 'Palabras Bonus',
    wordsFound: 'Palabras Encontradas',
    tapToSubmit: 'TOCA PARA ENVIAR',
    
    zenMode: 'Modo Zen',
    speedMode: 'Modo Velocidad',
    endlessMode: 'Modo Infinito',
    timeChallenge: 'Desafío de Tiempo',
    classicMode: 'Modo Clásico',
    
    excellent: ['¡Excelente!', '¡Increíble!', '¡Brillante!', '¡Fantástico!', '¡Soberbio!', '¡Perfecto!'],
    good: ['¡Bien!', '¡Genial!', '¡Bravo!', '¡Bien hecho!', '¡Correcto!'],
    bonus: ['¡Bonus!', '¡Puntos Extra!', '¡Palabra Oculta!', '¡Descubrimiento Secreto!'],
    tryAgain: 'Inténtalo de Nuevo',
    
    levelComplete: '¡Nivel Completado!',
    congratulations: '¡Felicitaciones!',
    wordsFoundCount: 'Palabras Encontradas',
    bonusWordsCount: 'Palabras Bonus',
    coinsEarned: 'Monedas Ganadas',
    nextLevel: 'Siguiente Nivel',
    doubleReward: 'Doble Recompensa',
    
    sound: 'Sonido',
    music: 'Música',
    language: 'Idioma',
    notifications: 'Notificaciones',
    rateApp: 'Calificar App',
    shareApp: 'Compartir App',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    
    basics: 'Básico',
    nature: 'Naturaleza',
    animals: 'Animales',
    food: 'Comida',
    home: 'Hogar',
    sports: 'Deportes',
    science: 'Ciencia',
    expert: 'Experto',
  },
  
  // FRENCH
  fr: {
    appName: 'WonderWordQuest',
    play: 'JOUER',
    settings: 'Paramètres',
    back: 'Retour',
    close: 'Fermer',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    yes: 'Oui',
    no: 'Non',
    ok: 'OK',
    
    currentCategory: 'CATÉGORIE ACTUELLE',
    level: 'Niveau',
    progress: 'Progrès',
    dailyChallenge: 'Défi Quotidien',
    dailyRewards: 'Récompenses Quotidiennes',
    achievements: 'Succès',
    leaderboard: 'Classement',
    statistics: 'Statistiques',
    watchAd: 'Regarder Pub',
    
    hint: 'Indice',
    shuffle: 'Mélanger',
    clear: 'Effacer',
    undo: 'Annuler',
    bonusWords: 'Mots Bonus',
    wordsFound: 'Mots Trouvés',
    tapToSubmit: 'APPUYEZ POUR ENVOYER',
    
    zenMode: 'Mode Zen',
    speedMode: 'Mode Vitesse',
    endlessMode: 'Mode Infini',
    timeChallenge: 'Défi Chronométré',
    classicMode: 'Mode Classique',
    
    excellent: ['Excellent!', 'Incroyable!', 'Brillant!', 'Fantastique!', 'Superbe!', 'Parfait!'],
    good: ['Bien!', 'Génial!', 'Bravo!', 'Bien joué!', 'Correct!'],
    bonus: ['Bonus!', 'Points Extra!', 'Mot Caché!', 'Découverte Secrète!'],
    tryAgain: 'Réessayer',
    
    levelComplete: 'Niveau Terminé!',
    congratulations: 'Félicitations!',
    wordsFoundCount: 'Mots Trouvés',
    bonusWordsCount: 'Mots Bonus',
    coinsEarned: 'Pièces Gagnées',
    nextLevel: 'Niveau Suivant',
    doubleReward: 'Double Récompense',
    
    sound: 'Son',
    music: 'Musique',
    language: 'Langue',
    notifications: 'Notifications',
    rateApp: 'Noter l\'App',
    shareApp: 'Partager l\'App',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
    
    basics: 'Basique',
    nature: 'Nature',
    animals: 'Animaux',
    food: 'Nourriture',
    home: 'Maison',
    sports: 'Sports',
    science: 'Science',
    expert: 'Expert',
  },
  
  // GERMAN
  de: {
    appName: 'WonderWordQuest',
    play: 'SPIELEN',
    settings: 'Einstellungen',
    back: 'Zurück',
    close: 'Schließen',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    yes: 'Ja',
    no: 'Nein',
    ok: 'OK',
    
    currentCategory: 'AKTUELLE KATEGORIE',
    level: 'Level',
    progress: 'Fortschritt',
    dailyChallenge: 'Tägliche Herausforderung',
    dailyRewards: 'Tägliche Belohnungen',
    achievements: 'Erfolge',
    leaderboard: 'Rangliste',
    statistics: 'Statistiken',
    watchAd: 'Werbung Ansehen',
    
    hint: 'Hinweis',
    shuffle: 'Mischen',
    clear: 'Löschen',
    undo: 'Rückgängig',
    bonusWords: 'Bonuswörter',
    wordsFound: 'Gefundene Wörter',
    tapToSubmit: 'TIPPEN ZUM SENDEN',
    
    zenMode: 'Zen-Modus',
    speedMode: 'Geschwindigkeitsmodus',
    endlessMode: 'Endlos-Modus',
    timeChallenge: 'Zeitherausforderung',
    classicMode: 'Klassischer Modus',
    
    excellent: ['Ausgezeichnet!', 'Erstaunlich!', 'Brillant!', 'Fantastisch!', 'Hervorragend!', 'Perfekt!'],
    good: ['Gut!', 'Super!', 'Bravo!', 'Gut gemacht!', 'Richtig!'],
    bonus: ['Bonus!', 'Extrapunkte!', 'Verstecktes Wort!', 'Geheime Entdeckung!'],
    tryAgain: 'Nochmal Versuchen',
    
    levelComplete: 'Level Abgeschlossen!',
    congratulations: 'Herzlichen Glückwunsch!',
    wordsFoundCount: 'Gefundene Wörter',
    bonusWordsCount: 'Bonuswörter',
    coinsEarned: 'Verdiente Münzen',
    nextLevel: 'Nächstes Level',
    doubleReward: 'Doppelte Belohnung',
    
    sound: 'Ton',
    music: 'Musik',
    language: 'Sprache',
    notifications: 'Benachrichtigungen',
    rateApp: 'App Bewerten',
    shareApp: 'App Teilen',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsOfService: 'Nutzungsbedingungen',
    
    basics: 'Grundlagen',
    nature: 'Natur',
    animals: 'Tiere',
    food: 'Essen',
    home: 'Zuhause',
    sports: 'Sport',
    science: 'Wissenschaft',
    expert: 'Experte',
  },
  
  // PORTUGUESE
  pt: {
    appName: 'WonderWordQuest',
    play: 'JOGAR',
    settings: 'Configurações',
    back: 'Voltar',
    close: 'Fechar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    yes: 'Sim',
    no: 'Não',
    ok: 'OK',
    
    currentCategory: 'CATEGORIA ATUAL',
    level: 'Nível',
    progress: 'Progresso',
    dailyChallenge: 'Desafio Diário',
    dailyRewards: 'Recompensas Diárias',
    achievements: 'Conquistas',
    leaderboard: 'Classificação',
    statistics: 'Estatísticas',
    watchAd: 'Assistir Anúncio',
    
    hint: 'Dica',
    shuffle: 'Embaralhar',
    clear: 'Limpar',
    undo: 'Desfazer',
    bonusWords: 'Palavras Bônus',
    wordsFound: 'Palavras Encontradas',
    tapToSubmit: 'TOQUE PARA ENVIAR',
    
    zenMode: 'Modo Zen',
    speedMode: 'Modo Velocidade',
    endlessMode: 'Modo Infinito',
    timeChallenge: 'Desafio de Tempo',
    classicMode: 'Modo Clássico',
    
    excellent: ['Excelente!', 'Incrível!', 'Brilhante!', 'Fantástico!', 'Soberbo!', 'Perfeito!'],
    good: ['Bom!', 'Legal!', 'Bravo!', 'Bem feito!', 'Correto!'],
    bonus: ['Bônus!', 'Pontos Extras!', 'Palavra Escondida!', 'Descoberta Secreta!'],
    tryAgain: 'Tente Novamente',
    
    levelComplete: 'Nível Completo!',
    congratulations: 'Parabéns!',
    wordsFoundCount: 'Palavras Encontradas',
    bonusWordsCount: 'Palavras Bônus',
    coinsEarned: 'Moedas Ganhas',
    nextLevel: 'Próximo Nível',
    doubleReward: 'Recompensa Dobrada',
    
    sound: 'Som',
    music: 'Música',
    language: 'Idioma',
    notifications: 'Notificações',
    rateApp: 'Avaliar App',
    shareApp: 'Compartilhar App',
    privacyPolicy: 'Política de Privacidade',
    termsOfService: 'Termos de Serviço',
    
    basics: 'Básico',
    nature: 'Natureza',
    animals: 'Animais',
    food: 'Comida',
    home: 'Casa',
    sports: 'Esportes',
    science: 'Ciência',
    expert: 'Especialista',
  },
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};

export const getRandomFeedback = (
  language: Language,
  type: 'excellent' | 'good' | 'bonus' = 'excellent'
): string => {
  const t = getTranslation(language);
  const texts = t[type];
  return texts[Math.floor(Math.random() * texts.length)];
};

export const SUPPORTED_LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export default translations;
