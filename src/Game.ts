import { Application } from 'pixi.js';
import { GameStateMachine } from './core/statemachine/GameStateMachine';
import { BootState } from './core/statemachine/states/BootState';

export class Game {
    private readonly app: Application;

    private stateMachine!: GameStateMachine;

    constructor() {
        this.app = new Application();
    }

    public async init(): Promise<void> {
        await this.app.init({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb
        });

        document.body.appendChild(this.app.canvas);        
        
        this.stateMachine = new GameStateMachine(this.app.stage);
        this.app.ticker.add((time) => {
            this.stateMachine.update(time.deltaTime);
        });
        await this.stateMachine.transitionTo(new BootState(this.stateMachine));        
    }
}