import { Application, Renderer } from "pixi.js";

export const createPixiPangApp = async (): Promise<Application<Renderer>> => {
    const app = new Application();

    await app.init({
        resizeTo: window,
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: 0xffffff,
    });

    return app;
};
