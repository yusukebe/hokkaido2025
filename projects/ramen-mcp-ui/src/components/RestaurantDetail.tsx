import React from 'react'
import { postMessageToParent } from '../client/utils/messageUtils'

type Shop = {
  id: string
  name: string
  taste: '家系' | '醤油' | '味噌' | '煮干し'
  rate: number
}

type Photo = {
  name: string
  width: number
  height: number
  authorId: string
  url: string
}

type Details = {
  address: string
  photos: Photo[]
}

type RestaurantDetailProps = {
  shop: Shop
  detail: Details
}

export const RestaurantDetail: React.FC<RestaurantDetailProps> = ({ shop, detail }) => {
  const renderStars = (rate: number) => {
    return '★'.repeat(rate) + '☆'.repeat(5 - rate)
  }

  const handleDirectionsClick = () => {
    const message = {
      type: 'prompt',
      payload: {
        prompt: `${detail.address}への行き方は?`
      }
    }
    postMessageToParent(message)
  }

  return (
    <div className="container">
      <div className="detail-header">
        <a href="/restaurants" className="back-link">
          ← 一覧に戻る
        </a>
        <h1 className="shop-name">{shop.name}</h1>

        <div className="shop-info">
          <div className="info-item">
            <span className="label">評価:</span>
            <div className="rating">
              <span className="stars">{renderStars(shop.rate)}</span>
              <span className="rating-number">({shop.rate}/5)</span>
            </div>
          </div>

          <div className="info-item">
            <span className="label">種類:</span>
            <span className="taste-badge">{shop.taste}</span>
          </div>

          <div className="info-item">
            <span className="label">住所:</span>
            <span className="address">{detail.address}</span>
            <button className="directions-btn" onClick={handleDirectionsClick}>
              行き方
            </button>
          </div>
        </div>
      </div>

      <div className="photos-section">
        <h2>写真</h2>
        <div className="photo-gallery">
          {detail.photos.map((photo, index) => (
            <div key={index} className="photo-item">
              <img src={photo.url} alt={photo.name} width={photo.width} height={photo.height} loading="lazy" />
              <div className="photo-info">
                <small>撮影者: {photo.authorId}</small>
              </div>
            </div>
          ))}
        </div>

        {detail.photos.length === 0 && <p className="no-photos">写真がありません。</p>}
      </div>
    </div>
  )
}
