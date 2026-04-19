/**
 * Game Modals Component
 * Extracted from index.tsx to reduce file size and improve maintainability
 */

import React from 'react';
import { DailyRewardsWheel } from './DailyRewardsWheel';
import { LeaderboardModal } from './LeaderboardModal';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { LevelSelectModal } from './LevelSelectModal';
import AchievementsModal from './AchievementsModal';
import DailyChallengeModal from './DailyChallengeModal';
import WordOfDayModal from './WordOfDayModal';
import StatsModal from './StatsModal';
import { ThemeSelectorModal, Theme } from './ThemeSelectorModal';
import { FeaturesHub } from './FeaturesHub';
import { MysteryBoxModal } from './MysteryBox';
import { ScratchCardModal } from './ScratchCard';
import { DailyLoginCalendar } from './DailyLoginCalendar';
import { LevelSkipModal, FreeHintsModal } from './AdRewardModals';
import { PowerUpsModal } from './PowerUpsModal';
import { CombosModal } from './CombosModal';
import { TimeChallengeModal } from './TimeChallengeModal';
import { ProfileModal } from './ProfileModal';
import { MusicModal } from './MusicModal';
import { CelebrationsModal } from './CelebrationsModal';
import { MascotModal } from './MascotModal';
import { EventsModal } from './EventsModal';
import TimedChallengeModal from './TimedChallengeModal';
import PhrasePuzzleModal from './PhrasePuzzleModal';
import ThemePacksModal from './ThemePacksModal';
import { 
  SpinWheelModal, 
  StatisticsModal, 
  ProgressMapModal, 
  LeaderboardModal as GameLeaderboardModal, 
  FriendChallengeModal,
  WordDefinitionModal 
} from './GameFeatureModals';
import RateAppModal from './RateAppModal';
import LanguageSelector from './LanguageSelector';

interface GameModalsProps {
  // Daily Wheel
  showDailyWheel: boolean;
  onCloseDailyWheel: () => void;

  // Leaderboard
  showLeaderboard: boolean;
  onCloseLeaderboard: () => void;

  // Privacy Policy
  showPrivacyPolicy: boolean;
  onClosePrivacyPolicy: () => void;

  // Level Select
  showLevelSelect: boolean;
  onCloseLevelSelect: () => void;
  onSelectLevel: (levelId: number) => void;
  levels: any[];
  progress: any;

  // Achievements
  showAchievements: boolean;
  onCloseAchievements: () => void;

  // Daily Challenge
  showDailyChallenge: boolean;
  onCloseDailyChallenge: () => void;

  // Word of Day
  showWordOfDay: boolean;
  onCloseWordOfDay: () => void;

  // Stats
  showStats: boolean;
  onCloseStats: () => void;

  // Themes
  showThemes: boolean;
  onCloseThemes: () => void;
  onSelectTheme: (theme: Theme) => void;
  currentTheme: string;
  unlockedThemes: string[];

  // Features Hub
  showFeaturesHub: boolean;
  onCloseFeaturesHub: () => void;
  onOpenMysteryBox: () => void;
  onOpenScratchCard: () => void;
  onOpenPiggyBank: () => void;
  onOpenPostcards: () => void;
  onOpenVocabulary: () => void;
  onOpenWonderFacts: () => void;
  onOpenWordPacks: () => void;
  mysteryBoxesAvailable: number;
  canScratch: boolean;

  // Mystery Box
  showMysteryBox: boolean;
  onCloseMysteryBox: () => void;
  onOpenBox: () => void;

  // Scratch Card
  showScratchCard: boolean;
  onCloseScratchCard: () => void;

  // Daily Login
  showDailyLogin: boolean;
  onCloseDailyLogin: () => void;
  loginStreak: number;
  onClaimDailyReward: (day: number, reward: any) => void;

  // Level Skip
  showLevelSkip: boolean;
  onCloseLevelSkip: () => void;
  onSkipLevel: () => void;

  // Free Hints
  showFreeHints: boolean;
  onCloseFreeHints: () => void;
  onClaimFreeHints: () => void;

  // Power Ups
  showPowerUps: boolean;
  onClosePowerUps: () => void;
  onUsePowerUp: (type: string) => void;
  coins: number;

  // Combos
  showCombos: boolean;
  onCloseCombos: () => void;

  // Time Challenge
  showTimeChallenge: boolean;
  onCloseTimeChallenge: () => void;
  onStartTimeChallenge: (difficulty: string) => void;

  // Profile
  showProfile: boolean;
  onCloseProfile: () => void;
  userAvatar: string;
  onChangeAvatar: (avatar: string) => void;
  username: string;
  onChangeUsername: (name: string) => void;
  currentStreak: number;
  bestStreak: number;

  // Music
  showMusic: boolean;
  onCloseMusic: () => void;

  // Celebrations
  showCelebrations: boolean;
  onCloseCelebrations: () => void;
  confettiEnabled: boolean;
  onToggleConfetti: (enabled: boolean) => void;
  screenShakeEnabled: boolean;
  onToggleScreenShake: (enabled: boolean) => void;
  particlesEnabled: boolean;
  onToggleParticles: (enabled: boolean) => void;

  // Mascot
  showMascot: boolean;
  onCloseMascot: () => void;
  currentMascot: string;
  onSelectMascot: (mascot: string) => void;

  // Events
  showEvents: boolean;
  onCloseEvents: () => void;

  // Timed Challenge (gameplay)
  showTimedChallenge: boolean;
  onCloseTimedChallenge: () => void;
  timedChallenge: any;

  // Phrase Puzzles
  showPhrasePuzzles: boolean;
  onClosePhrasePuzzles: () => void;
  phrasePuzzle: any;
  onCompletePhrasePuzzle: (puzzle: any, completed: boolean) => void;

  // Theme Packs
  showThemePacks: boolean;
  onCloseThemePacks: () => void;

  // Rate App
  showRateApp: boolean;
  onCloseRateApp: () => void;
  currentLevel: number;

  // Language Selector
  showLanguageSelector: boolean;
  onCloseLanguageSelector: () => void;
  currentLanguage: string;
  onSelectLanguage: (langCode: string) => void;
}

export const GameModals: React.FC<GameModalsProps> = ({
  // Daily Wheel
  showDailyWheel,
  onCloseDailyWheel,

  // Leaderboard
  showLeaderboard,
  onCloseLeaderboard,

  // Privacy Policy
  showPrivacyPolicy,
  onClosePrivacyPolicy,

  // Level Select
  showLevelSelect,
  onCloseLevelSelect,
  onSelectLevel,
  levels,
  progress,

  // Achievements
  showAchievements,
  onCloseAchievements,

  // Daily Challenge
  showDailyChallenge,
  onCloseDailyChallenge,

  // Word of Day
  showWordOfDay,
  onCloseWordOfDay,

  // Stats
  showStats,
  onCloseStats,

  // Themes
  showThemes,
  onCloseThemes,
  onSelectTheme,
  currentTheme,
  unlockedThemes,

  // Features Hub
  showFeaturesHub,
  onCloseFeaturesHub,
  onOpenMysteryBox,
  onOpenScratchCard,
  onOpenPiggyBank,
  onOpenPostcards,
  onOpenVocabulary,
  onOpenWonderFacts,
  onOpenWordPacks,
  mysteryBoxesAvailable,
  canScratch,

  // Mystery Box
  showMysteryBox,
  onCloseMysteryBox,
  onOpenBox,

  // Scratch Card
  showScratchCard,
  onCloseScratchCard,

  // Daily Login
  showDailyLogin,
  onCloseDailyLogin,
  loginStreak,
  onClaimDailyReward,

  // Level Skip
  showLevelSkip,
  onCloseLevelSkip,
  onSkipLevel,

  // Free Hints
  showFreeHints,
  onCloseFreeHints,
  onClaimFreeHints,

  // Power Ups
  showPowerUps,
  onClosePowerUps,
  onUsePowerUp,
  coins,

  // Combos
  showCombos,
  onCloseCombos,

  // Time Challenge
  showTimeChallenge,
  onCloseTimeChallenge,
  onStartTimeChallenge,

  // Profile
  showProfile,
  onCloseProfile,
  userAvatar,
  onChangeAvatar,
  username,
  onChangeUsername,
  currentStreak,
  bestStreak,

  // Music
  showMusic,
  onCloseMusic,

  // Celebrations
  showCelebrations,
  onCloseCelebrations,
  confettiEnabled,
  onToggleConfetti,
  screenShakeEnabled,
  onToggleScreenShake,
  particlesEnabled,
  onToggleParticles,

  // Mascot
  showMascot,
  onCloseMascot,
  currentMascot,
  onSelectMascot,

  // Events
  showEvents,
  onCloseEvents,

  // Timed Challenge
  showTimedChallenge,
  onCloseTimedChallenge,
  timedChallenge,

  // Phrase Puzzles
  showPhrasePuzzles,
  onClosePhrasePuzzles,
  phrasePuzzle,
  onCompletePhrasePuzzle,

  // Theme Packs
  showThemePacks,
  onCloseThemePacks,

  // Rate App
  showRateApp,
  onCloseRateApp,
  currentLevel,

  // Language Selector
  showLanguageSelector,
  onCloseLanguageSelector,
  currentLanguage,
  onSelectLanguage,
}) => {
  return (
    <>
      {/* Daily Rewards Wheel */}
      <DailyRewardsWheel
        visible={showDailyWheel}
        onClose={onCloseDailyWheel}
      />

      {/* Leaderboard */}
      <LeaderboardModal
        visible={showLeaderboard}
        onClose={onCloseLeaderboard}
      />

      {/* Privacy Policy */}
      <PrivacyPolicyModal
        visible={showPrivacyPolicy}
        onClose={onClosePrivacyPolicy}
      />

      {/* Level Select */}
      <LevelSelectModal
        visible={showLevelSelect}
        onClose={onCloseLevelSelect}
        onSelectLevel={onSelectLevel}
        levels={levels}
        progress={progress}
      />

      {/* Achievements */}
      <AchievementsModal
        visible={showAchievements}
        onClose={onCloseAchievements}
      />

      {/* Daily Challenge */}
      <DailyChallengeModal
        visible={showDailyChallenge}
        onClose={onCloseDailyChallenge}
      />

      {/* Word of Day */}
      <WordOfDayModal
        visible={showWordOfDay}
        onClose={onCloseWordOfDay}
      />

      {/* Stats */}
      <StatsModal
        visible={showStats}
        onClose={onCloseStats}
      />

      {/* Themes */}
      <ThemeSelectorModal
        visible={showThemes}
        onClose={onCloseThemes}
        onSelectTheme={onSelectTheme}
        currentTheme={currentTheme}
        unlockedThemes={unlockedThemes}
      />

      {/* Features Hub */}
      <FeaturesHub
        visible={showFeaturesHub}
        onClose={onCloseFeaturesHub}
        onOpenMysteryBox={onOpenMysteryBox}
        onOpenScratchCard={onOpenScratchCard}
        onOpenPiggyBank={onOpenPiggyBank}
        onOpenPostcards={onOpenPostcards}
        onOpenVocabulary={onOpenVocabulary}
        onOpenWonderFacts={onOpenWonderFacts}
        onOpenWordPacks={onOpenWordPacks}
        mysteryBoxesAvailable={mysteryBoxesAvailable}
        canScratch={canScratch}
      />

      {/* Mystery Box */}
      <MysteryBoxModal
        visible={showMysteryBox}
        onClose={onCloseMysteryBox}
        onOpen={onOpenBox}
      />

      {/* Scratch Card */}
      <ScratchCardModal
        visible={showScratchCard}
        onClose={onCloseScratchCard}
      />

      {/* Daily Login Calendar */}
      <DailyLoginCalendar
        visible={showDailyLogin}
        onClose={onCloseDailyLogin}
        currentStreak={loginStreak}
        onClaimReward={onClaimDailyReward}
      />

      {/* Level Skip */}
      <LevelSkipModal
        visible={showLevelSkip}
        onClose={onCloseLevelSkip}
        onSkip={onSkipLevel}
      />

      {/* Free Hints */}
      <FreeHintsModal
        visible={showFreeHints}
        onClose={onCloseFreeHints}
        onClaim={onClaimFreeHints}
      />

      {/* Power Ups */}
      <PowerUpsModal
        visible={showPowerUps}
        onClose={onClosePowerUps}
        onUsePowerUp={onUsePowerUp}
        coins={coins}
      />

      {/* Combos */}
      <CombosModal
        visible={showCombos}
        onClose={onCloseCombos}
      />

      {/* Time Challenge Setup */}
      <TimeChallengeModal
        visible={showTimeChallenge}
        onClose={onCloseTimeChallenge}
        onStart={onStartTimeChallenge}
      />

      {/* Profile */}
      <ProfileModal
        visible={showProfile}
        onClose={onCloseProfile}
        avatar={userAvatar}
        onChangeAvatar={onChangeAvatar}
        username={username}
        onChangeUsername={onChangeUsername}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
      />

      {/* Music */}
      <MusicModal
        visible={showMusic}
        onClose={onCloseMusic}
      />

      {/* Celebrations */}
      <CelebrationsModal
        visible={showCelebrations}
        onClose={onCloseCelebrations}
        confettiEnabled={confettiEnabled}
        onToggleConfetti={onToggleConfetti}
        screenShakeEnabled={screenShakeEnabled}
        onToggleScreenShake={onToggleScreenShake}
        particlesEnabled={particlesEnabled}
        onToggleParticles={onToggleParticles}
      />

      {/* Mascot */}
      <MascotModal
        visible={showMascot}
        onClose={onCloseMascot}
        currentMascot={currentMascot}
        onSelect={onSelectMascot}
      />

      {/* Events */}
      <EventsModal
        visible={showEvents}
        onClose={onCloseEvents}
      />

      {/* Timed Challenge Gameplay */}
      {timedChallenge && (
        <TimedChallengeModal
          visible={showTimedChallenge}
          onClose={onCloseTimedChallenge}
          challenge={timedChallenge}
        />
      )}

      {/* Phrase Puzzles */}
      {phrasePuzzle && (
        <PhrasePuzzleModal
          visible={showPhrasePuzzles}
          onClose={onClosePhrasePuzzles}
          puzzle={phrasePuzzle}
          onComplete={onCompletePhrasePuzzle}
        />
      )}

      {/* Theme Packs */}
      <ThemePacksModal
        visible={showThemePacks}
        onClose={onCloseThemePacks}
      />

      {/* Rate App */}
      <RateAppModal
        visible={showRateApp}
        onClose={onCloseRateApp}
        currentLevel={currentLevel}
      />

      {/* Language Selector */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={onCloseLanguageSelector}
        currentLanguage={currentLanguage}
        onSelectLanguage={onSelectLanguage}
      />
    </>
  );
};

export default GameModals;
