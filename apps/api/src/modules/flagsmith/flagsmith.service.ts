import { Injectable } from '@nestjs/common';
import * as flagsmith from 'flagsmith-nodejs';
import * as nodecache from 'node-cache';
import { IAzureAdAuthConfig } from './dto/azure-ad-auth.config';
import { IGoogleAuthConfig } from './dto/google-auth.config';
import { AZURE_AD_AUTH, GOOGLE_AUTH } from './flagsmith.headers';

@Injectable()
export class FlagsmithService {
    constructor() {
        flagsmith.init({
            environmentID: process.env.FLAGSMITH_API_KEY,
            api: process.env.FLAGSMITH_URL,
            //@ts-ignore
            cache: new nodecache({ stdTTL: 300 }),
        });
    }

    hasFeature(header: string) {
        return flagsmith.hasFeature(header);
    }

    getFeature(header: string) {
        return flagsmith.getValue(header);
    }

    async getFeatureObject<T>(header: string) {
        const result = await this.getFeature(header);
        return JSON.parse(result as string) as T;
    }

    isGoogleAuthEnabled() {
        return this.hasFeature(GOOGLE_AUTH);
    }

    async getGoogleAuthConfig() {
        return this.getFeatureObject<IGoogleAuthConfig>(GOOGLE_AUTH);
    }

    isAzureAdAuthEnabled() {
        return this.hasFeature(AZURE_AD_AUTH);
    }

    async getAzureAdAuthConfig() {
        return this.getFeatureObject<IAzureAdAuthConfig>(AZURE_AD_AUTH);
    }
}
