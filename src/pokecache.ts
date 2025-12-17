import {clearInterval} from "node:timers";

export type CacheEntry<T> = {
    createdAt: number;
    val: T;

}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }


    add<T>(key: string, val: T): void {
        this.#cache.set(key, {createdAt: Date.now(), val});
    }

    get<T>(key:string){
        return this.#cache.get(key);
    }

    #reap(){
        for (const [key, entry] of this.#cache.entries()) {
            if(Date.now() - entry.createdAt > this.#interval){
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

}
