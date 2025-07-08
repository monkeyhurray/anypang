import { Container, TilingSprite, Ticker, Assets, Application } from "pixi.js";

export class TiledBackground extends Container {
    public app: Application;

    public direction = -Math.PI * 0.15;

    private sprite!: TilingSprite;

    constructor(app: Application) {
        super();
        this.app = app;
        this.init();
    }

    public async init() {
        const texture = await Assets.load(
            "assets/preload/preload-atlas/background.png"
        );

        this.sprite = new TilingSprite({
            texture,
            width: this.app.screen.width,
            height: this.app.screen.height,
        });

        this.sprite.tileTransform.rotation = this.direction;
        this.sprite.tileScale.set(1);
        this.addChild(this.sprite);

        this.onRender = () => this.update(this.app.ticker);
    }

    public update(ticker: Ticker) {
        if (!this.sprite) return;
        const delta = ticker.deltaTime;
        this.sprite.tilePosition.x -= Math.sin(-this.direction) * delta;
        this.sprite.tilePosition.y -= Math.cos(-this.direction) * delta;
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
