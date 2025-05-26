interface AiKeys {
  readonly OPENAI_API_KEY: string
  readonly ANTHROPIC_API_KEY: string
}

interface Environment extends AiKeys {
  readonly ENVIRONMENT: 'development' | 'production'
}

declare namespace NodeJS {
  interface ProcessEnv extends Environment {}
}
