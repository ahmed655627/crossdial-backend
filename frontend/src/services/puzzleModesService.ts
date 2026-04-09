// Puzzle Modes API Service
// Handles persistence of puzzle mode progress to backend

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

export interface PuzzleModeProgress {
  mode_id: string;
  current_level: number;
  completed_levels: number[];
  total_score: number;
  highest_streak: number;
  last_played?: string;
}

export interface PuzzleModeStats {
  total_score: number;
  total_levels_completed: number;
  modes_played: number;
  highest_streak: number;
}

class PuzzleModesService {
  private deviceId: string = '';

  setDeviceId(id: string) {
    this.deviceId = id;
  }

  // Get all puzzle mode progress for the current device
  async getProgress(): Promise<{ [key: string]: PuzzleModeProgress }> {
    try {
      if (!this.deviceId) {
        console.warn('Device ID not set');
        return {};
      }

      const response = await fetch(`${API_URL}/api/puzzle-modes/progress/${this.deviceId}`);
      const data = await response.json();

      if (data.success) {
        return data.progress || {};
      }
      return {};
    } catch (error) {
      console.error('Error fetching puzzle mode progress:', error);
      return {};
    }
  }

  // Update progress after completing a level
  async updateProgress(
    modeId: string,
    levelCompleted: number,
    scoreEarned: number,
    streak: number = 0
  ): Promise<PuzzleModeProgress | null> {
    try {
      if (!this.deviceId) {
        console.warn('Device ID not set');
        return null;
      }

      const response = await fetch(`${API_URL}/api/puzzle-modes/progress/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: this.deviceId,
          mode_id: modeId,
          level_completed: levelCompleted,
          score_earned: scoreEarned,
          streak: streak,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data.progress;
      }
      return null;
    } catch (error) {
      console.error('Error updating puzzle mode progress:', error);
      return null;
    }
  }

  // Reset progress for a specific mode
  async resetProgress(modeId: string): Promise<boolean> {
    try {
      if (!this.deviceId) {
        console.warn('Device ID not set');
        return false;
      }

      const response = await fetch(
        `${API_URL}/api/puzzle-modes/progress/reset?device_id=${this.deviceId}&mode_id=${modeId}`,
        {
          method: 'POST',
        }
      );

      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('Error resetting puzzle mode progress:', error);
      return false;
    }
  }

  // Get leaderboard for a specific mode
  async getLeaderboard(modeId: string, limit: number = 10): Promise<any[]> {
    try {
      const response = await fetch(
        `${API_URL}/api/puzzle-modes/leaderboard/${modeId}?limit=${limit}`
      );
      const data = await response.json();

      if (data.success) {
        return data.leaderboard || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  // Get aggregated stats for all puzzle modes
  async getStats(): Promise<PuzzleModeStats | null> {
    try {
      if (!this.deviceId) {
        console.warn('Device ID not set');
        return null;
      }

      const response = await fetch(`${API_URL}/api/puzzle-modes/stats/${this.deviceId}`);
      const data = await response.json();

      if (data.success) {
        return data.stats;
      }
      return null;
    } catch (error) {
      console.error('Error fetching puzzle mode stats:', error);
      return null;
    }
  }
}

// Export singleton instance
export const puzzleModesService = new PuzzleModesService();
export default puzzleModesService;
