<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import { useProductStore } from '../stores/productsStores'
import { useUiStore } from '../stores/uiStores'
import { useFavoriteStore } from '@/stores/favoritesStore'
import { useCartStore } from '@/stores/cartStore'
import { useDelayedLoading } from '@/composables/useDelayedLoading'

import CartButton from '@/components/ui/CartButton.vue'
import FavoriteButton from '@/components/ui/FavoriteButton.vue'
import ImageSlider from './ImageSlider.vue'
import AccordionList from '@/playground/AccordionList.vue'

const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const uiStore = useUiStore()
const productStore = useProductStore()

const showLoading = useDelayedLoading(() => favoriteStore.favoritesLoading, 500)
const showSkeleton = useDelayedLoading(
  () => uiStore.isProductModalOpen && (productStore.productLoading || !productStore.imagesReady),
  500,
)

const isFavorite = computed(() =>
  productStore.activeProduct ? favoriteStore.isFavorite(productStore.activeProduct.id) : false,
)

const isAdded = computed(() =>
  productStore.activeProduct ? cartStore.isAdded(productStore.activeProduct.id) : false,
)

const isOpenDescription = ref(false)

const selectedSize = ref(null)

function closeProductModal() {
  uiStore.closeModal()
  productStore.clearActiveProduct()
  document.body.classList.remove('overflow-hidden')
  selectedSize.value = null
}

function toggleDescription() {
  isOpenDescription.value = !isOpenDescription.value
}

watch(selectedSize, () => {
  console.log(`selectedSize = ${selectedSize.value}`)
})
</script>

<template>
  <BaseModal :is-open-modal="uiStore.isProductModalOpen" @close-modal="closeProductModal">
    <div class="w-full h-full flex items-center flex-col gap gap-y-6 pb-8 rounded-xl">
      <div
        class="relative w-full h-3/5 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500"
      >
        <div v-if="showSkeleton" class="absolute inset-0 z-10 animate-pulse bg-gray-200"></div>
        <ImageSlider
          v-if="productStore.activeProduct"
          :images="productStore.activeProduct.imageUrl"
          :onLoading="productStore.onImageLoad"
        />
      </div>
      <div class="w-full h-[55px] flex gap gap-x-4 justify-between relative select-none pr-6 pl-6">
        <FavoriteButton
          class="w-[55px]"
          @click="
            productStore.activeProduct &&
            favoriteStore.favoritesToggle(productStore.activeProduct.id)
          "
          :is-favorite="isFavorite"
          :show-loading="showLoading"
        />

        <CartButton
          class="w-[60px]"
          @click.stop="cartStore.cartLocalToggle(productStore.activeProduct)"
          :is-added="isAdded"
        />
      </div>

      <AccordionList
        v-if="productStore.activeProduct"
        :accordion-data="productStore.activeProduct.accordionData"
        @size="selectedSize = $event"
      />
    </div>
  </BaseModal>
</template>
