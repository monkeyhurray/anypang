class StorageWrapper {
    private isBrowser(): boolean {
        return (
            typeof window !== "undefined" && typeof localStorage !== "undefined"
        );
    }

    public getString(key: string) {
        if (!this.isBrowser()) return undefined;
        return localStorage.getItem(key) ?? undefined;
    }

    public setString(key: string, value: string) {
        if (!this.isBrowser()) return;
        localStorage.setItem(key, value);
    }

    public getNumber(key: string) {
        const str = this.getString(key);
        const value = Number(str);
        return isNaN(value) ? null : value;
    }

    public setNumber(key: string, value: number) {
        this.setString(key, String(value));
    }

    public getBool(key: string) {
        if (!this.isBrowser()) return undefined;
        const bool = localStorage.getItem(key);
        return bool ? Boolean(bool.toLowerCase()) : undefined;
    }

    public setBool(key: string, value: boolean) {
        if (!this.isBrowser()) return;
        localStorage.setItem(key, String(value));
    }

    public getObject(key: string) {
        const str = this.getString(key);
        if (!str) return undefined;
        try {
            return JSON.parse(str);
        } catch (e) {
            console.warn(e);
            return undefined;
        }
    }

    public setObject(key: string, value: Record<string, unknown>) {
        this.setString(key, JSON.stringify(value));
    }
}

export const storage = new StorageWrapper();
