import {clearInterval} from "node:timers";

export type CacheEntry<T> = {
    createdAt: number;
    val: T;

}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();

    peek(): Map<string, CacheEntry<any>> {
        return new Map(this.#cache);
    }
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, {createdAt: Date.now(), val});
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        console.log(entry);
        return entry?.val;
    }

    #reap = () => {
        for (const [key, entry] of this.#cache.entries()) {
            if (Date.now() - entry.createdAt >= this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop(){
        this.#reap();
        this.#reapIntervalId = setInterval(this.#reap, this.#interval);
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

}
