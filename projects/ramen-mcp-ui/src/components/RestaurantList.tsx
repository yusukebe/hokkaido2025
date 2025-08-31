import React, { useState } from 'react'
import { postMessageToParent } from '../client/utils/messageUtils'

type Shop = {
  id: string
  name: string
  taste: '家系' | '醤油' | '味噌' | '煮干し'
  rate: number
}

type RestaurantListProps = {
  restaurants: Shop[]
  initialTaste?: string
  initialMinRate?: string
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  initialTaste = 'all',
  initialMinRate = '0'
}) => {
  const [selectedTaste, setSelectedTaste] = useState(initialTaste)
  const [minRate, setMinRate] = useState(Number(initialMinRate))

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (selectedTaste !== 'all' && restaurant.taste !== selectedTaste) {
      return false
    }
    if (restaurant.rate < minRate) {
      return false
    }
    return true
  })

  const renderStars = (rate: number) => {
    return '★'.repeat(rate) + '☆'.repeat(5 - rate)
  }

  const handleRestaurantClick = (restaurant: Shop, e: React.MouseEvent) => {
    e.preventDefault()
    const message = {
      type: 'tool',
      payload: {
        toolName: 'show_ramen_restaurant_details_with_ui',
        params: {
          name: restaurant.id
        }
      }
    }
    postMessageToParent(message)
  }

  return (
    <div className="container">
      <h1>ラーメン店一覧</h1>

      <div className="filter-section">
        <div className="filter-group">
          <label>味の種類:</label>
          <select
            value={selectedTaste}
            onChange={(e) => setSelectedTaste(e.currentTarget.value)}
            className="filter-select"
          >
            <option value="all">すべて</option>
            <option value="家系">家系</option>
            <option value="醤油">醤油</option>
            <option value="味噌">味噌</option>
            <option value="煮干し">煮干し</option>
          </select>
        </div>

        <div className="filter-group">
          <label>評価: {minRate}点以上</label>
          <input
            type="range"
            min="0"
            max="5"
            value={minRate}
            onChange={(e) => setMinRate(Number(e.currentTarget.value))}
            className="filter-slider"
          />
        </div>
      </div>

      <div className="restaurant-grid">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card" onClick={(e) => handleRestaurantClick(restaurant, e)}>
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <div className="restaurant-info">
              <div className="taste-badge">{restaurant.taste}</div>
              <div className="rating">
                <span className="stars">{renderStars(restaurant.rate)}</span>
                <span className="rating-number">({restaurant.rate}/5)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="no-results">条件に一致するラーメン店が見つかりませんでした。</div>
      )}
    </div>
  )
}
