import { Game } from './Game';
import { MockSDK } from './MockSDK';

console.log("Initializing TinyMace Engine.");

const isDevelopment = globalThis.location.hostname === "localhost" || globalThis.location.hostname === "127.0.0.1";
if (isDevelopment) {
    MockSDK.init();
}

try {
    const game = new Game();
    await game.init();
} catch (error) {
    console.error("Critical Failure:", error);
}