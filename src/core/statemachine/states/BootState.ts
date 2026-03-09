import { Assets, Text } from 'pixi.js';
import { SocialService } from '../../../services/SocialService';
import type { GameStateMachine } from '../GameStateMachine';
import { BaseState } from './BaseState';
import { MenuState } from './MenuState';

export class BootState extends BaseState {
    private readonly stateMachine: GameStateMachine
    private loadingText!: Text;

    constructor(stateMachine: GameStateMachine) {
        super();
        this.stateMachine = stateMachine;
    }

    public async enter() {
        console.log("Boot State: Entered");
        console.log("📦 Loading Assets...");
        await Assets.load('https://pixijs.com/assets/bunny.png');

        this.loadingText = new Text({ text: 'Loading 0%', style: { fill: 0xffffff } });
        this.loadingText.anchor.set(0.5);
        this.loadingText.position.set(400, 300);

        this.addChild(this.loadingText);

        await SocialService.initialize();

        for (let i = 0; i <= 100; i += 10) {
            SocialService.setProgress(i);
            this.loadingText.text = `Loading ${i}%`;
            await new Promise(r => setTimeout(r, 100));
        }

        await SocialService.startGame();

        this.stateMachine.transitionTo(new MenuState(this.stateMachine));
    }

    public update(delta: number) {
        // Do nothing, implemented to satisfy the interface
    }

    public exit() { console.log("Boot State: Exiting"); }
}