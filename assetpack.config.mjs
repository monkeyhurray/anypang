import { pixiPipes } from "@assetpack/core/pixi";

export default {
    entry: "./raw-assets",
    output: "./public/assets",
    bundles: {
        home: [
            "home/logo-game.png",
            "home/home-atlas/title.json",
            "home/home-atlas/title.png",
        ],
        preload: [
            /*...*/
        ],
    },
    pipes: [
        ...pixiPipes({
            manifest: {
                output: "./public/assets/assets-manifest.json",
            },
        }),
    ],
};
