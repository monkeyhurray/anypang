"use client";

import { useEffect, useRef } from "react";
import { createPixiPangApp } from "../libs/pixi-pang/createPixiPangApp";
import { Application, Container } from "pixi.js";

import { TiledBackground } from "@/app/ui/TiledBackground";
import { navigation } from "@/app/utils/navigation";
import resize from "../libs/pixi-pang/resizeBackground";
import { getUrlParam } from "../utils/getUrlParams";
import { GameScreen } from "../screens/GameScreen";
import { LoadScreen } from "../screens/LoadScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { HomeScreen } from "../screens/HomeScreen";

const GameCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);

    useEffect(() => {
        let cleanup: (() => void) | undefined;

        const initPixi = async () => {
            const app = await createPixiPangApp();
            appRef.current = app;

            if (containerRef.current) {
                containerRef.current.appendChild(app.canvas);
            }
            const container = new Container();
            const mapContainer = new Container();

            const bg = new TiledBackground();
            await bg.init(app);

            navigation.resize(app.screen.width, app.screen.height);

            const handleResize = () => {
                if (appRef.current) {
                    resize(appRef.current);
                }
            };

            window.addEventListener("resize", handleResize);
            handleResize();

            const gameScreen = new GameScreen(app);
            const loadScreen = new LoadScreen(app);

            if (getUrlParam("game") !== null) {
                await navigation.showScreen(gameScreen);
            } else if (getUrlParam("load") !== null) {
                await navigation.showScreen(loadScreen);
            } else if (getUrlParam("result") !== null) {
                await navigation.showScreen(ResultScreen);
            } else {
                await navigation.showScreen(HomeScreen);
            }

            cleanup = () => {
                console.log("cleanup called");
            };
        };

        initPixi();

        return () => {
            cleanup?.();
            if (appRef.current) {
                appRef.current.destroy(true, { children: true });
                appRef.current = null;
            }
        };
    }, []);

    return <div ref={containerRef} id="game-container" />;
};

export default GameCanvas;
