import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

type Favorite = {
  sneaker_id: number
  id: number
}

export const useFavoriteStore = defineStore('favorites', () => {
  const favorites = ref<Favorite[]>([])
  const propfavorites = ref<Favorite[]>([])
  const stateFetch = ref(false)

  async function requestFavorites() {
    try {
      const { data } = await axios.get('https://b561fe78d0163fe1.mokky.dev/favorites')
      // console.log(`${JSON.stringify(favorites)}`)
      favorites.value = data
    } catch (error) {
      console.log(error)
    }
  }

  function fetchFavoriteById(id: number) {
    return favorites.value.find((el) => el.sneaker_id === id)

    // console.log(`--- ${stateFetch.value}`)
    // return stateFetch.value
  }

  async function deleteFavoriteById(id: number) {
    try {
      await axios.delete(`https://b561fe78d0163fe1.mokky.dev/favorites/${id}`)
    } catch (error) {
      console.log(`error ${id}`)
    }
  }

  async function addToFavorite(obj: Favorite) {
    try {
      await axios.post(`https://b561fe78d0163fe1.mokky.dev/favorites`, obj)
    } catch (error) {
      console.log(error)
    }
  }

  function favoritesToggle(id: number) {
    if (fetchFavoriteById(id)) {
      const sneakerId = fetchFavoriteById(id).sneaker_id

      const objectId = fetchFavoriteById(id).id

      console.log(`${JSON.stringify(favorites.value)}`)

      favorites.value = favorites.value.filter((el) => el.sneaker_id !== sneakerId)

      deleteFavoriteById(objectId)

      console.log(`${JSON.stringify(favorites.value)} После удаления `)
    } else {
      // const sneakerId = fetchFavoriteById(id).sneaker_id
      // const fdslkf = favorites.value.slice(-1)
      const obj = {
        sneaker_id: id,
        id: favorites.value.length === 0 ? 0 : favorites.value.slice(-1)[0].id,
      }
      const objLocal = {
        sneaker_id: id,
        id: favorites.value.length === 0 ? 1 : favorites.value.slice(-1)[0].id + 1,
      }

      favorites.value.push(objLocal)

      addToFavorite(obj)

      console.log(`Добавление ${JSON.stringify(obj.id)}  ->fav ${JSON.stringify(favorites.value)} `)
    }
  }
  // console.log(` ${el.sneaker_id}===${id}`)

  return { requestFavorites, fetchFavoriteById, favorites, favoritesToggle }
})
