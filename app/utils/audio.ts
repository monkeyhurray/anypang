import gsap from "gsap";

class BGM {
    public currentAlias?: string;
    public current?: any;
    private volume = 1;

    public async play(alias: string, options?: any) {
        if (typeof window === "undefined") return;

        const { sound } = await import("@pixi/sound");

        if (this.currentAlias === alias) return;

        if (this.current) {
            const current = this.current;
            gsap.killTweensOf(current);
            gsap.to(current, { volume: 0, duration: 1, ease: "linear" }).then(
                () => {
                    current.stop();
                }
            );
        }

        this.current = sound.find(alias);
        this.currentAlias = alias;
        this.current?.play({ loop: true, ...options });
        this.current.volume = 0;

        gsap.killTweensOf(this.current);
        gsap.to(this.current, {
            volume: this.volume,
            duration: 1,
            ease: "linear",
        });
    }

    public getVolume() {
        return this.volume;
    }

    public setVolume(v: number) {
        this.volume = v;
        if (this.current) this.current.volume = v;
    }
}

class SFX {
    private volume = 1;

    public async play(alias: string, options?: any) {
        if (typeof window === "undefined") return;

        const { sound } = await import("@pixi/sound");
        const volume = this.volume * (options?.volume ?? 1);
        sound.play(alias, { ...options, volume });
    }

    public getVolume() {
        return this.volume;
    }

    public setVolume(v: number) {
        this.volume = v;
    }
}

export async function getMasterVolume() {
    if (typeof window === "undefined") return 0;
    const { sound } = await import("@pixi/sound");
    return sound.volumeAll;
}

export async function setMasterVolume(v: number) {
    if (typeof window === "undefined") return;
    const { sound } = await import("@pixi/sound");

    sound.volumeAll = v;
    if (!v) sound.muteAll();
    else sound.unmuteAll();
}

export const bgm = new BGM();
export const sfx = new SFX();
