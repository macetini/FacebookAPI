/**
 * TinyMace - Facebook Instant Games Mock SDK
 * Encapsulated as a Static Utility Class
 */
export class MockSDK {
    /**
     * Injects the Mock FBInstant object into the global scope
     * only if the real SDK is missing.
     */
    public static init(): void {
        console.log("🛠️ [TinyMace] Local Dev. Injecting Mock SDK Class.");

        (globalThis as any).FBInstant = {
            player: {
                getID: () => "mock_user_99",
                getName: () => "Marko (Architect Mode)",
                getPhoto: () => "https://profile-images.xing.com/images/c05177fc33102ca38c3f93a05bc30571-2/marko-cetini.1024x1024.jpg",
                setDataAsync: (data: Record<string, any>) => {
                    console.log("💾 [Mock Cloud Save]:", data);
                    return Promise.resolve();
                },
                
                getDataAsync: (keys: string[]) => {
                    console.log("📂 [Mock Cloud Load]:", keys);
                    // Return mock data for the keys requested
                    const mockData: Record<string, any> = {
                        lastScore: 550,
                        levelReached: 3,
                        hasCompletedTutorial: true
                    };

                    // Only return the keys the game actually asked for
                    const result = keys.reduce((acc, key) => {
                        if (mockData[key] !== undefined) acc[key] = mockData[key];
                        return acc;
                    }, {} as Record<string, any>);

                    return Promise.resolve(result);
                },
            },

            getLeaderboardAsync: (name: string) => Promise.resolve({
                setScoreAsync: (score: number) => {
                    console.log(`🏆 [Mock Leaderboard ${name}]: Score ${score} saved!`);
                    return Promise.resolve();
                }
            }),

            initializeAsync: () => {
                console.log("✅ [Mock]: initializeAsync resolved");
                return Promise.resolve();
            },

            setLoadingProgress: (prog: number) => {
                console.log(`⏳ [Mock Progress]: ${prog}%`);
            },

            startGameAsync: () => {
                console.log("✅ [Mock]: startGameAsync resolved");
                return Promise.resolve();
            },
        };
    }
}