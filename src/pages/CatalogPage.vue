<template>
    <div class="page">
        <h1>Каталог товаров</h1>
        <p>Перейди на <RouterLink to="/cart">корзину</RouterLink>, чтобы проверить работу состояния.</p>

        <p class="warning" v-if="cartStore.warningMessage">
            {{ cartStore.warningMessage }}
        </p>

        <div class="products-grid">
            <div v-for="product in products" :key="product.id" class="product-card">
                <h3>{{ product.name }}</h3>
                <p>{{ product.price }} ₽</p>
                <div class="card-actions">
                    <button @click="cartStore.addToCart(product)" class="btn-add">
                        В корзину
                    </button>
                    <button @click="favStore.toggleFavorite(product)" class="btn-fav">
                        {{favStore.items.some(i => i.id === product.id) ? '❤️' : '🤍'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'
import { useFavoritesStore } from '../stores/favorites.js'

const cartStore = useCartStore()
const favStore = useFavoritesStore()

const products = [
    { id: 1, name: 'Друг камешек', price: 8000 },
    { id: 2, name: 'Холодильник', price: 10500 },
    { id: 3, name: 'Фритюрница', price: 30000 },
    { id: 4, name: 'Экскаватор', price: 20000 }
]
</script>