<script setup lang="ts">
interface Person {
  age: string

  userName: string

  password: number
}

const obj = {
  age: 'Maga',

  userName: 'Mihail',

  password: 24323,
} as Person

const PersonKey = {
  age: 'age',

  userName: 'username',

  password: 'password',
} as const

function keys<T>(data: T): Array<keyof T> {
  return Object.keys(data) as Array<keyof T>
}
</script>

<template></template>
