import { Container } from 'pixi.js';

export abstract class BaseState extends Container {
    /**
    * Called when the state is added to the stage
    */
    public abstract enter(): void | Promise<void>;

    /**
    * Called every frame
    */
    public abstract update(delta: number): void;

    /**
    * Called before the state is destroyed
    */
    public abstract exit(): void;
}