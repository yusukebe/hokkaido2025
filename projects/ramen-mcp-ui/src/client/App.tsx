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
  const [uiResource, setUIResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadResource = async (toolName: string) => {
    setLoading(true)
    setError(null)
    setUIResource(null)
    try {
      const block = await fetchMcpResource(toolName)
      setUIResource(block.resource as Resource)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>MCP-UI Client Demo</h1>
      <button onClick={() => loadResource('dice_roll')}>Dice Roll</button>

      {loading && <p>Loading resource...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {uiResource && (
        <div style={{ marginTop: 20, border: '2px solid blue', padding: 10 }}>
          <h2>Rendering Resource: {uiResource.uri}</h2>
          <UIResourceRenderer resource={uiResource} />
        </div>
      )}
    </div>
  )
}

export default App
