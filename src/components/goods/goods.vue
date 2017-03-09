<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" @click="selectMenu(index, $event)"
                    :class="{'current': currentIndex === index}">
                    <span class="text border-1px">
                        <icon v-show="item.type>0" :icon-type="item.type" img-type="3"></icon>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.seliveryPrice"
                  :min-price="seller.minPrice"></shopcart>
        <food @add="addFood" :food="selectedFood" ref="food"></food>
    </div>
</template>

<script type="text/ecmascript-6">
    import icon from 'components/icon/icon'
    import shopcart from 'components/shopcart/shopcart'
    import cartcontrol from 'components/cartcontrol/cartcontrol'
    import food from 'components/food/food'
    import BScroll from 'better-scroll'

    const ERR_OK = 0

    export default {
        props: {
            seller: {type: Object}
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        computed: {
            currentIndex() {
                for (let i = 0, len = this.listHeight.length; i < len; i++) {
                    let height1 = this.listHeight[i]
                    let height2 = this.listHeight[i + 1]
                    let scrollY = this.scrollY

                    if (!height2 || (scrollY >= height1 && scrollY < height2)) {
                        return i
                    }
                }

                return 0
            },
            selectFoods() {
                let foods = []
                // 遍历每一类商品
                this.goods.forEach((good) => {
                    // 遍历某类商品中每种食物
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        methods: {
            initScroll() {
                let $refs = this.$refs
                this.menuScroll = new BScroll($refs.menuWrapper, {click: true})
                this.foodsScroll = new BScroll($refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                })

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
                let height = 0

                this.listHeight.push(height)
                for (let i = 0, len = foodList.length; i < len; i++) {
                    height += foodList[i].clientHeight
                    this.listHeight.push(height)
                }
            },
            selectMenu(index, event) {
                // event._constructed 为
                //   true:  即为vue触发的click事件
                //   false: 原生click事件
                if (!event._constructed) {
                    return
                }

                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
                let el = foodList[index]

                this.foodsScroll.scrollToElement(el, 10)
            },
            addFood(target) {
                this.drop(target)
            },
            drop(target) {
                // 体验优化,异步执行下落动画
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target)
                })
            },
            selectFood(food, event) {
                // event._constructed 为
                //   true:  即为vue触发的click事件
                //   false: 原生click事件
                if (!event._constructed) {
                    return
                }
                this.selectedFood = food
                this.$refs.food.show()
            }
        },
        created() {
            this.$http.get('/api/goods').then((res) => {
                const result = res.body
                if (result.errno === ERR_OK) {
                    this.goods = result.data
                    this.$nextTick(() => {
                        // 初始化滑动插件
                        this.initScroll()
                        // 计算每类食物列表顶部的高度
                        this.calculateHeight()
                    })
                }
            })
        },
        components: {icon, shopcart, cartcontrol, food}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                    &:after
                        content: ""
                        position: absolute
                        left: 0
                        top: 0
                        bottom: 0
                        width: 5px
                        background-color: #3190e8
                    .text
                        border-none()
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        line-height: 10px
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px

                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>
