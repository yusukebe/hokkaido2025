import React, { useState } from 'react'
import { UIResourceRenderer } from '@mcp-ui/client'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import type { ContentBlock, Resource } from '@modelcontextprotocol/sdk/types.js'

const fetchMcpResource = async (toolName: string): Promise<ContentBlock> => {
  const client = new Client({
    name: 'streamable-http-client',
    version: '0.0.0'
  })

  const transport = new StreamableHTTPClientTransport(new URL('/mcp', window.location.href))
  await client.connect(transport)
  let result
  if (toolName === 'dice_roll') {
    result = await client.callTool({
      name: toolName,
      arguments: {
        spots: 6
      }
    })
  } else {
    throw new Error(`Unknown tool: ${toolName}`)
  }

  return (result?.content as ContentBlock[])[0]
}

const App: React.FC = () => {
  return (
    <div>
      <h1>MCP-UI Demo</h1>
      <ul>
        <a href="/restaurants">ラーメン店一覧</a>
      </ul>
    </div>
  )
}

export default App
