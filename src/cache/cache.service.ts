import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';


@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    // <T> is the type of the data you want to pass to the cache
    // when you call this method, you need to pass the type of the data you want to store
    async getCache<T>(
        key: string,
        functionRequest: () => Promise<T>
    ): Promise<T> {
        
        const allData: T = await this.cacheManager.get(key);

        if (allData) {
            // console.log(`Found in cache, for stateId: ${stateId}\n`)
            return allData;
        }

        const cities: T = await functionRequest();

        await this.cacheManager.set(key, cities);
        // console.log(`Not found in cache, for stateId: ${stateId}\n`)

        return cities;
    }
}
