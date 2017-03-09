<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/sellers">商家</router-link>
            </div>
        </div>
        <transition @before-enter="beforeSwipe" @enter="swiping" @after-enter="afterSwipe" name="swipe">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import header from './components/header/header'
    import {urlParse} from 'common/js/util'

    const ERR_OK = 0

    export default {
        data() {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse()
                        return queryParam.id
                    })()
                }
            }
        },
        computed: {},
        created() {
            this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
                const result = res.body
                if (result.errno === ERR_OK) {
                    this.seller = Object.assign({}, this.seller, result.data)
                    console.log(this.seller)
                }
            })
        },
        methods: {
            beforeSwipe(el) {
//                el.style.display = ''
//                el.style.transform = 'translate3d(100%,0px,0)'
//                el.style.webkitTransform = 'translate3d(100%,0px,0)'
            },
            swiping(el, done) {
//                /* eslint-disable no-unused-vars */
//
//                // 强制浏览器重绘
//                let rf = el.offsetHeight
//                this.$nextTick(() => {
//                    el.style.transform = 'translate3d(0,0,0)'
//                    el.style.webkitTransform = 'translate3d(0,0,0)'
//                    el.addEventListener('transitionend', done)
//                })
            },
            afterSwipe(el) {}
        },
        components: {
            'v-header': header
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"

    #app
        .tab
            display: flex
            width: 100%
            height: 40px
            line-height: 40px
            border-1px(rgb(7, 17, 27, 0.1))
            .tab-item
                flex: 1
                text-align: center
                & > a
                    display: block
                    font-size: 14px
                    color: rgb(77, 85, 93)
                    &.active
                        color: rgb(240, 20, 20)
        > div:last-child
            transition: all .3s
</style>
