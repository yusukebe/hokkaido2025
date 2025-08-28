import { Hono } from 'hono'
import { renderer } from './renderer'
import apiApp from './api'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<div id="root"></div>)
})

app.route('/api', apiApp)

export default app
