declare global {
    namespace NodeJS {
        interface ProcessEnv {
            FLAGSMITH_URL: string;
            FLAGSMITH_API_KEY: string;
            DATABASE_URL: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_SECRET: string;
            GOOGLE_CALLBACK: string;
            AZURE_AD_SECRET: string;
            AZURE_AD_CLIENT_ID: string;
            AZURE_AD_CALLBACK: string;
            AZURE_AD_RESOURCE: string;
            AZURE_AD_TENANT: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
