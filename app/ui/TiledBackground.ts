import { Container, TilingSprite, Ticker, Assets, Application } from "pixi.js";

export class TiledBackground extends Container {
    public direction = -Math.PI * 0.15;
    private sprite!: TilingSprite;

    constructor() {
        super();
    }

    public async init(app: Application) {
        const texture = await Assets.load(
            "assets/preload/preload-atlas/background.png"
        );

        this.sprite = new TilingSprite({
            texture,
            width: app.screen.width,
            height: app.screen.height,
        });

        this.sprite.tileTransform.rotation = this.direction;
        this.sprite.tileScale.set(1);
        this.addChild(this.sprite);

        this.onRender = () => this.update(app.ticker);
    }

    public update(ticker: Ticker) {
        const delta = ticker.deltaTime;
        this.sprite.tilePosition.x -= Math.sin(-this.direction) * delta;
        this.sprite.tilePosition.y -= Math.cos(-this.direction) * delta;
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
