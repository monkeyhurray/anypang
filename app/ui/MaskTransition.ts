import { Application, Sprite, Texture } from "pixi.js";
import gsap from "gsap";

import { getNavigation } from "../utils/navigation";
import { createPixiPangApp } from "../libs/pixi-pang/createPixiPangApp";

/**
 * Cover or reveal the entire app, masking the whole screen in a cauldron shape,
 * scaling up (reveal) or down (cover) animated
 */

export class MaskTransition {
    public app: Application;
    /** Flat colour base to cover the screen */
    private base: Sprite;
    /** A static cauldron sprite used as mask */
    private cauldron: Sprite;

    constructor(app: Application) {
        this.app = app;
        this.base = new Sprite(Texture.WHITE);
        this.base.tint = 0x0a0025;

        this.cauldron = Sprite.from("white-cauldron");
        this.cauldron.anchor.set(0.5);
    }

    /** Resize the base to the app size and center the cauldron */
    private resize() {
        const navigation = getNavigation();
        this.base.width = navigation.width;
        this.base.height = navigation.height;
        this.cauldron.x = navigation.width * 0.5;
        this.cauldron.y = navigation.height * 0.5;
    }

    /** Mask the app in cauldron shape that scales down, hiding the entire screen */
    public async playTransitionOut() {
        const app = await createPixiPangApp();

        const navigation = getNavigation();
        const duration = 0.7;

        this.resize();
        this.cauldron.scale.set(20);
        this.cauldron.rotation = 0.5;
        this.cauldron.alpha = 1;

        // Update layers
        app.stage.addChildAt(this.base, 0);
        app.stage.addChildAt(this.cauldron, 0);
        // TODO: Double check this
        // this.cauldron.updateTransform();

        // Play animation
        navigation.container.mask = this.cauldron;
        navigation.container.interactiveChildren = false;
        gsap.to(this.cauldron, {
            alpha: 0.5,
            rotation: -0.5,
            duration,
            ease: "sine.out",
        });
        await gsap.to(this.cauldron.scale, {
            x: 0,
            y: 0,
            duration,
            ease: "quint.out",
        });
        navigation.container.interactiveChildren = true;
        navigation.container.mask = null;

        // Cleanup
        app.stage.removeChild(this.base);
        app.stage.removeChild(this.cauldron);
    }

    /** Mask the app in cauldron shape that scales up, showin the entire screen */
    public async playTransitionIn() {
        const duration = 0.7;

        const navigation = getNavigation();
        this.resize();
        this.cauldron.scale.set(0);
        this.cauldron.rotation = -0.5;
        this.cauldron.alpha = 0.5;

        // Update layers
        this.app.stage.addChildAt(this.base, 0);
        this.app.stage.addChildAt(this.cauldron, 0);
        // TODO: Double check this
        // this.cauldron.updateTransform();

        // Play animation
        navigation.container.mask = this.cauldron;
        navigation.container.interactiveChildren = false;
        gsap.to(this.cauldron, {
            alpha: 1,
            rotation: 0.5,
            duration,
            ease: "sine.in",
        });
        await gsap.to(this.cauldron.scale, {
            x: 30,
            y: 30,
            duration,
            ease: "quint.in",
        });
        navigation.container.interactiveChildren = true;
        navigation.container.mask = null;

        // Cleanup
        this.app.stage.removeChild(this.base);
        this.app.stage.removeChild(this.cauldron);
    }
}
