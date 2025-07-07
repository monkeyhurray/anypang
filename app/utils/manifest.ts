import { Assets } from "pixi.js";

export async function loadAssetManifest() {
    const res = await fetch("/assets/assets-manifest.json");
    if (!res.ok) throw new Error("Failed to load assets-manifest.json");
    const manifest = await res.json();
    await Assets.init({ manifest }); // ✅ Pixi에 등록
}
