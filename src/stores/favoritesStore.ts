import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

type Favorite = {
  sneaker_id: number
  id: number
}

type FavoriteTemporary = {
  sneaker_id: number
  temp_id: string
}

type FavoriteState = Favorite | FavoriteTemporary

type Operations = { type: 'adding' | 'removing'; currentOperationId: string }

export const useFavoriteStore = defineStore('favorites', () => {
  const favorites = ref<FavoriteState[]>([])

  const favoritesLoading = ref(false)

  const favoritesState = reactive<Record<number, Operations>>({})

  async function requestFavorites() {
    try {
      const { data } = await axios.get('https://b561fe78d0163fe1.mokky.dev/favorites')

      favorites.value = data
    } catch (error) {
      throw error //!Добавить для этого catch в компоненте Card
    }
  }

  function isFavorite(id: number): boolean {
    return favorites.value.some((el) => el.sneaker_id === id)
  }

  function getFavoriteBySneakerId(id: number): FavoriteState | undefined {
    return favorites.value.find((el) => el.sneaker_id === id)
  }
  async function deleteBySneakerId(id: number) {
    const fetchFavorite = getFavoriteBySneakerId(id)

    if (fetchFavorite && 'id' in fetchFavorite) {
      const index = favorites.value.findIndex((el) => el === fetchFavorite)

      favoritesState[id] = { type: 'removing', currentOperationId: crypto.randomUUID() }

      const operationId = favoritesState[id].currentOperationId

      if (index !== -1) {
        try {
          // const sneakerId = fetchFavorite.sneaker_id

          const objectId = fetchFavorite.id

          favorites.value.splice(index, 1)

          favoritesLoading.value = true

          await axios.delete(`https://b561fe78d0163fe1.mokky.dev/favorites/${objectId}`)
        } catch (error) {
          favorites.value.splice(index, 0, fetchFavorite)
          throw error
        } finally {
          if (operationId !== favoritesState[id].currentOperationId) return
          delete favoritesState[id]
          favoritesLoading.value = false
        }
      }
    } else if (fetchFavorite && 'temp_id' in fetchFavorite) {
      const index = favorites.value.findIndex((el) => el === fetchFavorite)
      favorites.value.splice(index, 1)
    } else throw new Error('Этот товар уже удалён из избранного')
  }

  async function addToFavorite(id: number) {
    const obj = {
      sneaker_id: id,
    }
    const objTemp = {
      sneaker_id: obj.sneaker_id,
      temp_id: crypto.randomUUID(),
    }

    favoritesState[id] = { type: 'adding', currentOperationId: crypto.randomUUID() }

    const operationId = favoritesState[id].currentOperationId
    try {
      favorites.value.push(objTemp)

      favoritesLoading.value = true

      const { data } = await axios.post(`https://b561fe78d0163fe1.mokky.dev/favorites`, obj)

      replacementTemporaryFavorite(data, objTemp)
    } catch (error) {
      const indexTemp = favorites.value.findIndex(
        (el) => 'temp_id' in el && el.temp_id === objTemp.temp_id,
      )
      if (indexTemp !== -1) {
        favorites.value.splice(indexTemp, 1)
      } else return
      throw error
    } finally {
      if (operationId !== favoritesState[id].currentOperationId) return
      delete favoritesState[id]

      favoritesLoading.value = false
    }
  }

  function replacementTemporaryFavorite(obj: Favorite, objTemp: FavoriteTemporary) {
    // const replacementFavorite = obj

    const indexReplacementObject = favorites.value.findIndex(
      (el) => 'temp_id' in el && el.temp_id === objTemp.temp_id,
    )
    if (indexReplacementObject !== -1) {
      favorites.value.splice(indexReplacementObject, 1, obj)
    } else return
  }

  async function favoritesToggle(id: number) {
    if (favoritesState[id]) {
      return
    }

    const stateIsFavorite = isFavorite(id)

    if (stateIsFavorite) {
      try {
        await deleteBySneakerId(id)
      } catch (error) {
        alert(`Не удалось удалить из избранного данный товар ${error}`)
      }
    } else {
      try {
        await addToFavorite(id)
      } catch (error) {
        alert(`Не удалось добавить в избранное данный товар ${error}`)
      }
    }
  }

  return { requestFavorites, isFavorite, favorites, favoritesToggle, favoritesLoading }
})
