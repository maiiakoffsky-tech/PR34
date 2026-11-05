<template>
  <div class="page">
    <h1>Корзина</h1>
    <div class="cart-summary">
      <p><strong>Товаров:</strong> {{ cartStore.count }} / 10</p>
      <p><strong>Итого:</strong> {{ cartStore.sum }} ₽</p>
      
      <div class="cart-controls">
        <button v-if="cartStore.lastState" @click="cartStore.undo()" class="btn-undo">
          ⬅️ Отменить
        </button>
        <button @click="downloadCart" class="btn-download">
          Скачать JSON
        </button>
      </div>
    </div>

    <ul v-if="cartStore.items.length" class="cart-list">
      <li 
        v-for="item in cartStore.items" 
        :key="item.id" 
        class="cart-item"
      >
        <div class="item-info">
          <strong>{{ item.name }}</strong>
          <span>{{ item.price }} ₽</span>
        </div>
        <div class="item-actions">
          <button @click="cartStore.updateQuantity(item.id, -1)" class="btn-qty">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="cartStore.updateQuantity(item.id, 1)" class="btn-qty">+</button>
          <button @click="cartStore.removeFromCart(item.id)" class="btn-remove">Удалить</button>
        </div>
      </li>
    </ul>
    <p v-else>Корзина пуста.</p>

    <button v-if="cartStore.items.length" @click="cartStore.clearCart()" class="btn-danger">
      Очистить корзину
    </button>

    <p style="margin-top: 1.5rem; color: #666;">
      Обнови страницу – состояние сохранится благодаря localStorage.
    </p>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()

const downloadCart = () => {
  const dataStr = JSON.stringify(cartStore.items, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'my_cart.json'
  link.click()
  URL.revokeObjectURL(url)
}
</script>