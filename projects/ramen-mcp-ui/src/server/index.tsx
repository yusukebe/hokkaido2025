import { Hono } from 'hono'
import { renderer } from './renderer'
import { MyMCP } from './mcp'
import { RestaurantList } from '../components/RestaurantList'
import { RestaurantDetail } from '../components/RestaurantDetail'
import { index, details } from '../data/restaurants'
import { logger } from 'hono/logger'
export { MyMCP }

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<div id="root"></div>)
})

app.get('/restaurants', (c) => {
  const taste = c.req.query('taste')
  const minRate = c.req.query('minRate')

  return c.render(
    <div id="root">
      <RestaurantList restaurants={index.shops} initialTaste={taste} initialMinRate={minRate} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__RESTAURANT_DATA__ = ${JSON.stringify(index.shops)};`
        }}
      />
    </div>
  )
})

app.get('/restaurants/:id', (c) => {
  const id = c.req.param('id')
  const shop = index.shops.find((s) => s.id === id)
  const detail = details[id]

  if (!shop || !detail) {
    return c.render(
      <div id="root">
        <div className="container">
          <h1>店舗が見つかりません</h1>
          <a href="/restaurants">← 一覧に戻る</a>
        </div>
      </div>
    )
  }

  return c.render(
    <div id="root">
      <RestaurantDetail shop={shop} detail={detail} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.__SHOP_DATA__ = ${JSON.stringify(shop)};
          window.__DETAIL_DATA__ = ${JSON.stringify(detail)};
        `
        }}
      />
    </div>
  )
})

app.mount(
  '/sse',
  (request, env, ctx) => {
    ctx.props.requestUrl = request.url
    return MyMCP.serveSSE('/sse').fetch(request, env, ctx)
  },
  {
    replaceRequest: false
  }
)

export default app
