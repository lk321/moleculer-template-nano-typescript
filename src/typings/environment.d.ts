export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      MONGO_DEFAULT_DATABASE?: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
