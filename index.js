import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductDetails from "../views/ProductDetails.vue";
import AdminPanel from "../views/AdminPanel.vue";
import CategoryProducts from "../views/CategoryProducts.vue"; // New page for showing category products
import CartPage from "../views/CartPage.vue"; // Cart page import করো
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },

  { path: "/", name: "Home", component: HomePage },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
    meta: { requiresAuth: true }, // Requires login
  },
  {
    path: "/delivery-details",
    name: "DeliveryDetails",
    component: () => import("../views/DeliveryDetails.vue"),
    meta: { requiresAuth: true }, // Requires login
  },
  {
    path: "/category/:id",
    name: "CategoryProducts",
    component: CategoryProducts,
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanel,
    meta: { requiresAuth: true }, // Requires login
  },
  {
    path: "/product/:id",
    name: "ProductDetails",
    component: ProductDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken"); // Local Storage থেকে টোকেন চেক করো
  if (to.meta.requiresAuth && !token) {
    alert("Please login to access this page!");
    next("/login"); // যদি টোকেন না থাকে, তাহলে Login পেজে রিডাইরেক্ট করো
  } else {
    next(); // যদি টোকেন থাকে, তাহলে পেজ লোড করতে দাও
  }
});

export default router;
