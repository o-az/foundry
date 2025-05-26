import * as Bun from 'bun'
import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

const FORGE_LINK = 'https://github.com/o-az/foundry/blob/master/crates/forge/bin'

const { text } = await generateText({
  prompt: `look into ${FORGE_LINK} and convert all the commands and their respective args into TypeScript interfaces and types`,
  model: anthropic('claude-3-7-sonnet-20250219'),
})

const [result] = text.split('```').filter(Boolean)
if (result) {
  Bun.write('./src/generated/forge-types.ts', result)
}
