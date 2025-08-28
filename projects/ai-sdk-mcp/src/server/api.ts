import { Hono } from 'hono'
import { createAnthropic } from '@ai-sdk/anthropic'
import { convertToModelMessages, streamText, UIMessage } from 'ai'

const app = new Hono<{
  Bindings: Cloudflare.Env
}>()

app.post('/chat', async (c) => {
  const { messages } = await c.req.json<{ messages: UIMessage[] }>()

  const anthropic = createAnthropic({
    apiKey: c.env.ANTHROPIC_API_KEY
  })

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    messages: convertToModelMessages(messages)
  })

  return result.toUIMessageStreamResponse()
})

export default app
