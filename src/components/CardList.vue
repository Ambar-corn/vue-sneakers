<script setup>
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Добавлено милорд')
}
</script>
<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      imageUrl="/sneakers/sneakers-1-removebg-preview.png"
      :price="1200"
      :is-added="false"
      :is-favorite="false"
      :onClickAdd="onClickAdd"
    />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>
