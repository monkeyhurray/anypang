import { Assets } from "pixi.js";

/**
 * 게임 번들을 PixiJS에 등록하고 로딩합니다.
 * @param onProgress
 */
export const loadGameAssets = async (
    onProgress: (progress: number) => void
) => {
    Assets.addBundle("home", {
        "home/home-atlas/logo-game.png": "assets/home/home-atlas/logo-game.png",
    });
    Assets.addBundle("game", {
        "game/game-atlas/books-01.png": "assets/game/game-atlas/books-01.png",
        "game/game-atlas/books-02.png": "assets/game/game-atlas/books-02.png",
        "game/game-atlas/books-03.png": "assets/game/game-atlas/books-03.png",
        "game/game-atlas/books-04.png": "assets/game/game-atlas/books-04.png",
        "game/game-atlas/books-05.png": "assets/game/game-atlas/books-05.png",
        "game/game-atlas/game-header.png":
            "assets/game/game-atlas/game-header.png",
        "game/game-atlas/highlight.png": "assets/game/game-atlas/highlight.png",
        "game/game-atlas/num-stroke-1.png":
            "assets/game/game-atlas/num-stroke-1.png",
        "game/game-atlas/num-stroke-2.png":
            "assets/game/game-atlas/num-stroke-2.png",
        "game/game-atlas/num-stroke-3.png":
            "assets/game/game-atlas/num-stroke-3.png",
        "game/game-atlas/num-stroke-4.png":
            "assets/game/game-atlas/num-stroke-4.png",
        "game/game-atlas/num-stroke-5.png":
            "assets/game/game-atlas/num-stroke-5.png",
        "game/game-atlas/piece-dragon.png":
            "assets/game/game-atlas/piece-dragon.png",
        "game/game-atlas/piece-frog.png":
            "assets/game/game-atlas/piece-frog.png",
        "game/game-atlas/piece-newt.png":
            "assets/game/game-atlas/piece-newt.png",
        "game/game-atlas/piece-snake.png":
            "assets/game/game-atlas/piece-snake.png",
        "game/game-atlas/piece-spider.png":
            "assets/game/game-atlas/piece-spider.png",
        "game/game-atlas/piece-yeti.png":
            "assets/game/game-atlas/piece-yeti.png",
        "game/game-atlas/shelf-block.png":
            "assets/game/game-atlas/shelf-block.png",
        "game/game-atlas/shelf-corner.png":
            "assets/game/game-atlas/shelf-corner.png",
        "game/game-atlas/special-blast.png":
            "assets/game/game-atlas/special-blast.png",
        "game/game-atlas/special-colour.png":
            "assets/game/game-atlas/special-colour.png",
        "game/game-atlas/special-column.png":
            "assets/game/game-atlas/special-column.png",
        "game/game-atlas/special-row.png":
            "assets/game/game-atlas/special-row.png",
    });

    // 번들 로딩
    const textures = await Assets.loadBundle("game", (progress) => {
        onProgress(Math.round(progress * 100));
    });

    return textures;
};
