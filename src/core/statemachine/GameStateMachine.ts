import { Container } from 'pixi.js';

export interface IState extends Container {
    enter(): void;
    update(delta: number): void;
    exit(): void;
}

export class GameStateMachine {
    private currentState?: IState;
    private readonly stage: Container;

    constructor(stage:Container) {
        this.stage = stage;
    }

    public async transitionTo(newState: IState): Promise<void> {
        if (this.currentState) {
            this.currentState.exit();
            this.currentState.removeFromParent();
            this.currentState.destroy({ children: true });
        }

        this.currentState = newState;
        this.stage.addChild(this.currentState);
        this.currentState.enter();
    }

    public update(delta: number): void {
        this.currentState?.update(delta);
    }
}