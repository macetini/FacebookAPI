/**
 * SocialService handles all communication with the Facebook Instant Games SDK.
 * It abstracts the global FBInstant object to provide a clean, typed API.
 */
export class SocialService {    
    /**
     * Initializes the SDK. This must be the first call made to the platform.
     */
    public static async initialize(): Promise<void> {
        try {
            await FBInstant.initializeAsync();
            console.log("💎 [SocialService] Platform Initialized");
        } catch (error) {
            console.error("💎 [SocialService] Initialization failed:", error);
        }
    }

    /**
     * Updates the loading progress bar on the Facebook splash screen.
     * @param percentage - A value between 0 and 100.
     */
    public static setProgress(percentage: number): void {
        const safeValue = Math.min(100, Math.max(0, percentage));
        FBInstant.setLoadingProgress(safeValue);
    }

    /**
     * Signals to Facebook that the game is ready to be played.
     * This swaps the loading screen for the game canvas.
     */
    public static async startGame(): Promise<void> {
        try {
            await FBInstant.startGameAsync();
            console.log("💎 [SocialService] Game Started");
        } catch (error) {
            console.error("💎 [SocialService] Failed to start game:", error);
        }
    }

    /**
     * Retrieves the player's name. Falls back to 'Guest' if unavailable.
     */
    public static getPlayerName(): string {
        try {
            return FBInstant.player.getName() || "Guest";
        } catch {
            return "Guest";
        }
    }

    /**
     * Retrieves the player's profile picture URL.
     */
    public static getPlayerPhoto(): string {
        try {
            return FBInstant.player.getPhoto() || "";
        } catch {
            return "";
        }
    }

    /**
     * Saves a score to a specific leaderboard.
     * @param leaderboardName - The ID of the leaderboard (e.g., 'Global')
     * @param score - The numeric score to save.
     */
    public static async saveScore(leaderboardName: string, score: number): Promise<void> {
        try {
            const leaderboard = await FBInstant.getLeaderboardAsync(leaderboardName);
            await leaderboard.setScoreAsync(score);
            console.log(`🏆 [SocialService] Score ${score} saved to ${leaderboardName}`);
        } catch (error) {
            console.error(`🏆 [SocialService] Failed to save score to ${leaderboardName}:`, error);
        }
    }
}