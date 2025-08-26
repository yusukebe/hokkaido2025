import { Hono } from 'hono'
import { renderer } from './renderer'
import { MyMCP } from './mcp'
export { MyMCP }

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<div id="root"></div>)
})

app.mount('/sse', MyMCP.serveSSE('/sse').fetch, { replaceRequest: false })
app.mount('/mcp', MyMCP.serve('/mcp').fetch, { replaceRequest: false })

export default app
