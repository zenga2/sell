import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/sellers/seller'
import NotFound from 'components/notfound/404'

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        {path: '/', redirect: '/goods'},
        {path: '/goods', component: Goods},
        {path: '/ratings', component: Ratings},
        {path: '/sellers', component: Seller},
        {path: '*', component: NotFound}
    ]
})
