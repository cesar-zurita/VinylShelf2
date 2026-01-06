/*
This router was created with future scalability in mind.
At the moment, it is not actively used in the project.
*/

import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{ path: '/',
        name: 'home',
        component: HomeView
    }]
})

export default router;