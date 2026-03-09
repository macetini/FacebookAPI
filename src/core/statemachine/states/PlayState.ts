import { Sprite, Text } from 'pixi.js';
import { SocialService } from '../../../services/SocialService';
import type { GameStateMachine } from '../GameStateMachine';
import { BaseState } from './BaseState';
import { MenuState } from './MenuState';

/**
 * PlayState handles the core gameplay logic.
 */
export class PlayState extends BaseState {
    private readonly gameState: GameStateMachine;

    private score: number = 0;
    private scoreText!: Text;
    private bunny!: Sprite;
    private isGameOver: boolean = false;

    constructor(readOnly: GameStateMachine) {
        super();
        this.gameState = readOnly;
    }

    public enter(): void {
        console.log("🎮 PlayState: Entering");

        // 1. Setup Score Text (Top Left)
        this.scoreText = new Text({
            text: `Score: 0`,
            style: {
                fill: 0xffffff,
                fontSize: 28,
                fontWeight: 'bold'
            }
        });
        this.scoreText.position.set(30, 30);
        this.addChild(this.scoreText);

        // 2. Setup the "Target" Bunny
        // PixiJS v8 automatically handles texture loading for from()
        this.bunny = Sprite.from('https://pixijs.com/assets/bunny.png');
        this.bunny.anchor.set(0.5);
        this.bunny.position.set(400, 300);

        // Make the bunny interactive
        this.bunny.eventMode = 'static';
        this.bunny.cursor = 'pointer';

        // Listen for clicks/taps
        this.bunny.on('pointerdown', () => this.onBunnyClicked());

        this.addChild(this.bunny);
    }

    private onBunnyClicked(): void {
        if (this.isGameOver) return;

        // Increase score
        this.score += 10;
        this.scoreText.text = `Score: ${this.score}`;

        // Feedback: Pop the bunny's scale
        this.bunny.scale.set(1.5);

        // Logic: End game at 50 points for testing
        if (this.score >= 50) {
            this.endGame();
        }
    }

    private async endGame(): Promise<void> {
        this.isGameOver = true;
        this.bunny.eventMode = 'none'; // Disable clicks

        console.log(`🏁 Game Over! Final Score: ${this.score}`);

        // 3. Save Score to our Mocked Leaderboard
        // This will trigger the console log in your MockSDK.ts
        await SocialService.saveScore('Global_Leaderboard', this.score);

        // 4. Return to Menu after a short delay
        setTimeout(() => {
            this.gameState.transitionTo(new MenuState(this.gameState));
        }, 2000);
    }

    /**
     * update is called every frame by the GameStateMachine
     */
    public update(delta: number): void {
        if (this.isGameOver) {
            // If game over, make the bunny fall off the screen
            this.bunny.y += 10 * delta;
            this.bunny.alpha -= 0.05 * delta;
        } else {
            // Rotate the bunny. Speed increases as score goes up!
            const rotationSpeed = 0.05 + (this.score * 0.002);
            this.bunny.rotation += rotationSpeed * delta;

            // Smoothly return scale to 1.0 if it was popped by a click
            if (this.bunny.scale.x > 1) {
                this.bunny.scale.x -= 0.1 * delta;
                this.bunny.scale.y -= 0.1 * delta;
            }
        }
    }

    public exit(): void {
        console.log("🎮 PlayState: Exiting");
        // Pixi Container's destroy() will handle child cleanup
    }
}