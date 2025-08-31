import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import { index, details } from '../data/restaurants'
import { z } from 'zod'

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: 'ramen-mcp-ui',
    version: '0.0.1'
  })
  async init() {
    this.server.tool('my_favorite_ramen_restaurant', 'Return the my favorite ramen restaurant', {}, async ({}) => {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(index)
          }
        ]
      }
    })

    this.server.tool(
      'ramen_restaurant_details',
      'The details of the ramen restaurant',
      {
        restaurantName: z.string()
      },
      async ({ restaurantName }) => {
        const theDetails = details[restaurantName] ?? {}
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(theDetails)
            }
          ]
        }
      }
    )
  }
}
