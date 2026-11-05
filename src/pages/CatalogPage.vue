<template>
  <div class="page">
    <h1>Каталог товаров</h1>
    <p>Перейди на <RouterLink to="/cart">корзину</RouterLink>, чтобы проверить работу состояния.</p>

    <div class="products-grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
      >
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} ₽</p>
        <button @click="addToCart(product)" class="btn-add">
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()

const products = [
  { id: 1, name: 'Ноутбук', price: 50000 },
  { id: 2, name: 'Мышь', price: 1500 },
  { id: 3, name: 'Клавиатура', price: 3000 },
  { id: 4, name: 'Монитор', price: 20000 }
]

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>
