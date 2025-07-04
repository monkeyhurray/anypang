import { Application, Graphics, Renderer, Sprite, Texture } from "pixi.js";

export const createPixiPangApp = async (): Promise<Application<Renderer>> => {
    const app = new Application();
    await app.init({
        resizeTo: window,
        backgroundColor: 0xffffff,
    });
    const texture = Texture.from("assets/preload/background.png");
    const bg = new Sprite(texture);

    // 화면에 꽉 차게 조정
    bg.width = app.screen.width;
    bg.height = app.screen.height;

    app.stage.addChild(bg);

    return app;
};
