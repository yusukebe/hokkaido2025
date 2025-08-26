import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { renderToString } from 'react-dom/server'
import { z } from 'zod'
import { createUIResource } from '@mcp-ui/server'
import { McpAgent } from 'agents/mcp'

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: 'mcp-ui-example',
    version: '0.0.1'
  })
  async init() {
    this.server.tool(
      'dice_roll',
      'Return the vale of the dice roll',
      {
        spots: z.number().min(1).max(100).default(6).describe('The number of spots')
      },
      async ({ spots }) => {
        const result = Math.floor(Math.random() * spots) + 1
        const resourceBlock = createUIResource({
          uri: `ui://dice_roll/${result}`,
          content: {
            type: 'rawHtml',
            htmlString: renderToString(
              <div>
                <p style={{ color: result === 1 ? 'red' : 'black', fontSize: '24px' }}>spots: {result}</p>
              </div>
            )
          },
          encoding: 'text'
        })
        return {
          content: [resourceBlock]
        }
      }
    )
  }
}
