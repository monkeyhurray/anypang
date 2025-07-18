import { Match3Mode, match3ValidModes } from "../match3/Match3Config";
import { bgm, setMasterVolume, sfx } from "./audio";
import { storage } from "./storage";

// Keys for saved items in storage
const KEY_VOLUME_MASTER = "volume-master";
const KEY_VOLUME_BGM = "volume-bgm";
const KEY_VOLUME_SFX = "volume-sfx";
const KEY_GAME_MODE = "game-mode";

/**
 * Persistent user settings of volumes and game mode.
 */
class UserSettings {
    constructor() {
        setMasterVolume(this.getMasterVolume());
        bgm.setVolume(this.getBgmVolume());
        sfx.setVolume(this.getSfxVolume());
    }

    /** Get current game mode */
    public getGameMode() {
        const mode = storage.getString(KEY_GAME_MODE) as Match3Mode;
        return match3ValidModes.includes(mode) ? mode : "normal";
    }

    /** Set current game mode */
    public setGameMode(mode: Match3Mode) {
        if (!match3ValidModes.includes(mode)) {
            throw new Error("Invalid game mode: " + mode);
        }
        return storage.setString(KEY_GAME_MODE, mode);
    }

    /** Get overall sound volume */
    getMasterVolume() {
        if (typeof window === "undefined") return 1; // SSR일 경우 기본값 반환

        const volume = localStorage.getItem("volume");
        return parseFloat(volume ?? "1");
    }

    /** Set overall sound volume */

    setMasterVolume(v: number) {
        if (typeof window === "undefined") return;
        localStorage.setItem("volume", String(v));
    }
    /** Get background music volume */
    public getBgmVolume() {
        return storage.getNumber(KEY_VOLUME_BGM) ?? 1;
    }

    /** Set background music volume */
    public setBgmVolume(value: number) {
        bgm.setVolume(value);
        storage.setNumber(KEY_VOLUME_BGM, value);
    }

    /** Get sound effects volume */
    public getSfxVolume() {
        return storage.getNumber(KEY_VOLUME_SFX) ?? 1;
    }

    /** Set sound effects volume */
    public setSfxVolume(value: number) {
        sfx.setVolume(value);
        storage.setNumber(KEY_VOLUME_SFX, value);
    }
}
let userSettingsInstance: UserSettings | null = null;

/** SHared user settings instance */

export const userSettings = new UserSettings();

export const getUserSettings = (): UserSettings => {
    if (!userSettingsInstance) {
        userSettingsInstance = new UserSettings();
    }
    return userSettingsInstance;
};
