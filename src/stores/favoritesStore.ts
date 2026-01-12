import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useFavoriteStore = defineStore('favorites', () => {
  const fetchFavorites = async () => {
    try {
      const { data: favorites } = await axios.get('https://b561fe78d0163fe1.mokky.dev/favorites')
      console.log(`${JSON.stringify(favorites)}`)
    } catch (err) {
      console.log(err)
    }
  }

  return { fetchFavorites }
})
