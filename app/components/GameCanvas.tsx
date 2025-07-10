"use client";

import { useEffect, useRef } from "react";
import { createPixiPangApp } from "../libs/pixi-pang/createPixiPangApp";
import { Application } from "pixi.js";
import { Assets } from "pixi.js";
import { TiledBackground } from "@/app/ui/TiledBackground";
import { initNavigation, getNavigation } from "@/app/utils/navigation";

import resize from "../libs/pixi-pang/resizeBackground";
import { getUrlParam } from "../utils/getUrlParams";
import { GameScreen } from "../screens/GameScreen";
import { LoadScreen } from "../screens/LoadScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { HomeScreen } from "../screens/HomeScreen";

import { manifest } from "../../assets-manifest";

const GameCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);

    useEffect(() => {
        let cleanup: (() => void) | undefined;

        const initPixi = async () => {
            await Assets.init({ manifest });

            const app = await createPixiPangApp();
            appRef.current = app;
            initNavigation(app);

            const navigation = getNavigation();
            if (containerRef.current) {
                containerRef.current.appendChild(app.canvas);
            }

            const handleResize = () => {
                if (appRef.current) resize(app);
            };
            window.addEventListener("resize", handleResize);
            handleResize();

            // 5. 화면 전환 시 사용할 배경 설정

            const bg = new TiledBackground(app);
            await bg.init();

            app.stage.addChild(bg);
            // app.ticker.add(() => bg.update(app.ticker));

            // 6. 에셋 번들 로딩
            try {
                await Assets.loadBundle("home");
                await Assets.loadBundle("game");
                await Assets.loadBundle("common");
                await Assets.loadBundle("preload");
                await Assets.loadBundle("result");
            } catch (e) {
                console.error("❌ 번들 로딩 에러:", e);
            }

            // 7. URL 파라미터에 따른 초기 화면 전환

            await navigation.showScreen(LoadScreen, app);

            if (getUrlParam("game") !== null) {
                await navigation.showScreen(GameScreen, app);
            } else if (getUrlParam("load") !== null) {
                await navigation.showScreen(LoadScreen, app);
            } else if (getUrlParam("result") !== null) {
                await navigation.showScreen(ResultScreen, app);
            } else {
                await navigation.showScreen(HomeScreen);
            }

            // 8. 정리 함수 등록
            cleanup = () => {
                console.log("cleanup called");
                window.removeEventListener("resize", handleResize);
            };
        };

        initPixi();

        // 9. 언마운트 시 정리
        return () => {
            cleanup?.();

            Assets.unloadBundle("home");
            Assets.unloadBundle("game");
            Assets.unloadBundle("common");
            Assets.unloadBundle("preload");
            Assets.unloadBundle("result");
            if (appRef.current) {
                appRef.current.destroy(true, { children: true });
                appRef.current = null;
            }
        };
    }, []);
    return <div ref={containerRef} id="game-container" />;
};

export default GameCanvas;
