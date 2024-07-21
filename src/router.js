import { createRouter,createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),



    routes: [

        
        {
            name: 'home',
            path: '/',
            component: import('@/pages/Index.vue'),
            meta: {title: 'home',requiresAuth: false}
        }
    ]
})