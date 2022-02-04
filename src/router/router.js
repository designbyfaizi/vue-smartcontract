import Home from "@/views/Home.vue";
import About from "@/views/About.vue"
import Crypto from "@/views/Crypto.vue"
import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();
const router = createRouter({
    history,
    routes:[
        {
            path: "/",
            component: Home,
            name: 'Home'
        },
        {
            path: "/about",
            component: About,
            name: 'About'
        },
        {
            path: "/crypto",
            component: Crypto,
            name: 'Crypto'
        },
    ]
});

export default router;