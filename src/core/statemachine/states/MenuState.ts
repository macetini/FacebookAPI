import { Text } from 'pixi.js';
import { SocialService } from '../../../services/SocialService';
import type { GameStateMachine } from '../GameStateMachine';
import { BaseState } from './BaseState';
import { PlayState } from './PlayState';

/**
 * MenuState is the "Home Screen" of the game.
 * It greets the player using the SocialService and waits for a start command.
 */
export class MenuState extends BaseState {

    private readonly fsm: GameStateMachine

    constructor(fsm: GameStateMachine) {
        super();
        this.fsm = fsm;
    }

    /**
     * Called when the GameStateMachine switches to this state.
     */
    public enter(): void {
        console.log("🏠 MenuState: Entered");

        // 1. Get the player's name from our Mock (SocialService)
        const playerName = SocialService.getPlayerName();

        // 2. Create Welcome Text
        const welcomeText = new Text({
            text: `Hi, ${playerName}!\n\nTAP TO START`,
            style: {
                fill: 0xffffff,
                fontSize: 32,
                align: 'center',
                fontWeight: 'bold'
            }
        });

        // Center the text
        welcomeText.anchor.set(0.5);
        welcomeText.position.set(400, 300); // Based on our 800x600 canvas
        this.addChild(welcomeText);

        // 3. Make this state interactive
        this.eventMode = 'static';
        this.cursor = 'pointer';

        // 4. Set up the click/tap listener to start the game
        this.once('pointerdown', () => {
            this.startGame();
        });
    }

    /**
     * Transition logic to move to the Gameplay.
     */
    private startGame(): void {
        console.log("🚀 MenuState: Starting Game...");
        this.fsm.transitionTo(new PlayState(this.fsm));
    }

    /**
     * Optional: Add some floating animation or juice to the menu here.
     */
    public update(delta: number): void {
        // Example: Subtle pulse effect for the "Tap to Start" text
        const pulse = Math.sin(Date.now() * 0.005) * 0.05;
        this.scale.set(1 + pulse);
    }

    /**
     * Clean up listeners when leaving the menu.
     */
    public exit(): void {
        console.log("🏠 MenuState: Exiting");
        this.off('pointerdown');
    }
}