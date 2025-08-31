import { hydrateRoot, createRoot } from 'react-dom/client'
import { RestaurantList } from '../components/RestaurantList'
import { RestaurantDetail } from '../components/RestaurantDetail'
import App from './App'
import '../style.css'

const root = document.getElementById('root')
if (!root) {
  console.error('Root element not found')
  throw new Error('Root element not found')
}

const path = window.location.pathname

if (path === '/restaurants') {
  // リストページのhydration
  const urlParams = new URLSearchParams(window.location.search)
  const restaurants = (window as any).__RESTAURANT_DATA__ || []

  if (root.hasChildNodes() && root.children.length > 0) {
    // サーバーサイドレンダリングされた場合はhydrate
    hydrateRoot(
      root,
      <>
        <RestaurantList
          restaurants={restaurants}
          initialTaste={urlParams.get('taste') || undefined}
          initialMinRate={urlParams.get('minRate') || undefined}
        />
      </>
    )
  } else {
    // クライアントサイドレンダリングの場合
    createRoot(root).render(
      <RestaurantList
        restaurants={restaurants}
        initialTaste={urlParams.get('taste') || undefined}
        initialMinRate={urlParams.get('minRate') || undefined}
      />
    )
  }
} else if (path.startsWith('/restaurants/')) {
  // 詳細ページのhydration
  const shop = (window as any).__SHOP_DATA__
  const detail = (window as any).__DETAIL_DATA__

  if (shop && detail) {
    if (root.hasChildNodes() && root.children.length > 0) {
      hydrateRoot(
        root,
        <>
          <RestaurantDetail shop={shop} detail={detail} />
        </>
      )
    } else {
      createRoot(root).render(<RestaurantDetail shop={shop} detail={detail} />)
    }
  } else {
    console.error('Shop or detail data not found')
  }
} else {
  // 既存のApp（ホームページ用）
  if (root.hasChildNodes() && root.children.length > 0) {
    hydrateRoot(root, <App />)
  } else {
    createRoot(root).render(<App />)
  }
}
