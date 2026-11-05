<template>
  <nav>
    <RouterLink to="/">Каталог</RouterLink>
    <RouterLink to="/cart">Корзина</RouterLink>
    
    <span class="fav-counter">
      Избранное: {{ favStore.count }}
    </span>
  </nav>
  <RouterView />
</template>

<script setup>
import { useFavoritesStore } from './stores/favorites.js'
const favStore = useFavoritesStore()
</script>