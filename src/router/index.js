import { createRouter, createWebHistory } from "vue-router";

// Import Views & Layout
import LoginView from "../views/LoginView.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import AppLayout from "@/layouts/AppLayout.vue"; // 🔹 New Layout with bottom nav
import DashboardView from "../views/DashboardView.vue";
import EventsList from "@/components/EventsList.vue";
import ServiceRequest from "@/components/ServiceRequest.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // Default route → goes to login
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegistrationForm,
  },
  {
    path: "/",
    component: AppLayout, // 🔹 All routes inside layout share bottom nav
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardView,
      },
      {
        path: "events",
        name: "Events",
        component: EventsList,
      },
      {
        path: "services",
        name: "Services",
        component: ServiceRequest,
      },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Navigation Guard
import { auth } from "../firebase";
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
