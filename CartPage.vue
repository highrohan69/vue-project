<template>
  <div>
    <h1>Your Cart</h1>
    <div v-if="cart.length > 0">
      <div v-for="item in cart" :key="item.productId._id">
        <h2>{{ item.productId.name }}</h2>
        <p>Quantity: {{ item.quantity }}</p>
        <p>Price: {{ item.productId.price }}</p>
      </div>
    </div>
    <p v-else>Your cart is empty</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    async fetchCart() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.cart = response.data.items;
      } catch (error) {
        console.error(error);
        alert("Failed to fetch cart");
      }
    },
  },
  created() {
    this.fetchCart();
  },
};
</script>
