<template>
  <div class="page">
    <h1>Корзина</h1>
    <div class="cart-summary">
      <p><strong>Товаров:</strong> {{ cartStore.count }}</p>
      <p><strong>Итого:</strong> {{ cartStore.sum }} ₽</p>
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
          <button @click="updateQuantity(item.id, -1)" class="btn-qty">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(item.id, 1)" class="btn-qty">+</button>
          <button @click="removeFromCart(item.id)" class="btn-remove">Удалить</button>
        </div>
      </li>
    </ul>
    <p v-else>Корзина пуста.</p>

    <button v-if="cartStore.items.length" @click="clearCart" class="btn-danger">
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

const removeFromCart = (id) => {
  cartStore.removeFromCart(id)
}

const updateQuantity = (id, delta) => {
  cartStore.updateQuantity(id, delta)
}

const clearCart = () => {
  cartStore.clearCart()
}
</script>