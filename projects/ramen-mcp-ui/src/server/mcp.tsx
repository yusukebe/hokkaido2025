import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import { index, details } from '../data/restaurants'
import { z } from 'zod'
import { createUIResource } from '@mcp-ui/server'

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: 'ramen-mcp-ui',
    version: '0.0.1'
  })
  async init() {
    this.server.tool('get_ramen_restaurants', 'Get my favorite ramen restaurants', {}, async ({}) => {
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
      'get_ramen_restaurant_details',
      'Get the details of the ramen restaurant',
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

    this.server.tool(
      'show_ramen_restaurants_with_ui',
      'Displays a UI for my favorite ramen restaurants. Use get_ramen_restaurants unless asked to SHOW the ramen restaurants',
      {
        minRate: z.number().default(0),
        taste: z.string().default('all')
      },
      async ({ minRate, taste }) => {
        const requestUrl = this.props.requestUrl as string
        const url = new URL(requestUrl)
        const requestHost = url.host

        const scheme = requestHost.includes('localhost') || requestHost.includes('127.0.0.1') ? 'http' : 'https'

        const pageUrl = `${scheme}://${requestHost}/restaurants?minRate=${minRate.toString()}&taste=${encodeURIComponent(
          taste
        )}`

        const uniqueUIAppUri = `ui://ramen/restaurants/${Date.now()}` as `ui://${string}`
        const resourceBlock = createUIResource({
          uri: uniqueUIAppUri,
          content: { type: 'externalUrl', iframeUrl: pageUrl },
          encoding: 'text'
        })
        return {
          content: [resourceBlock]
        }
      }
    )

    this.server.tool(
      'show_ramen_restaurant_details_with_ui',
      'Displays a UI for the ramen restaurant',
      {
        name: z.string()
      },
      async ({ name }) => {
        const requestUrl = this.props.requestUrl as string
        const url = new URL(requestUrl)
        const requestHost = url.host

        const scheme = requestHost.includes('localhost') || requestHost.includes('127.0.0.1') ? 'http' : 'https'

        const pageUrl = `${scheme}://${requestHost}/restaurants/${name}`

        const uniqueUIAppUri = `ui://ramen/restaurants/${name}/${Date.now()}` as `ui://${string}`
        const resourceBlock = createUIResource({
          uri: uniqueUIAppUri,
          content: { type: 'externalUrl', iframeUrl: pageUrl },
          encoding: 'text'
        })
        return {
          content: [resourceBlock]
        }
      }
    )
  }
}
