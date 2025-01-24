import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AboutUs from "@/views/AboutUs.vue";
import AddThought from "@/views/AddThought.vue";
import Thoughts from "@/views/Thoughts.vue";
import Profile from "@/views/Profile.vue";
import { projectAuth } from "@/firebase/config";

const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "login" });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (user) {
    next({ name: "home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/thoughts",
    name: "thoughts",
    component: Thoughts,
    beforeEnter: requireAuth,
  },
  {
    path: "/thought/:id",
    name: "thoughtdetails",
    component: () => import("../views/ThoughtDetails.vue"),
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/about-us",
    name: "aboutus",
    component: AboutUs,
  },
  {
    path: "/add-thought",
    name: "addthought",
    component: AddThought,
    beforeEnter: requireAuth,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
    beforeEnter: requireNoAuth,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/auth/Signup.vue"),
    beforeEnter: requireNoAuth,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
