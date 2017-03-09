<template>
    <span :class="className"></span>
</template>


<script type="text/ecmascript-6">
    export default {
        props: ['iconType', 'imgType'],
        created() {
            this.typeStrArr = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        },
        computed: {
            className() {
                return [this.typeStrArr[this.iconType], 'icon-' + this.imgType]
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl"

    imgTypeArr = 1 2 3 4
    typeStrArr = decrease discount guarantee invoice special
    sizeArr = 12px 16px 12px 16px
    marginRArr = 4px 6px 2px 6px

    for imgType, index in imgTypeArr
        .icon-{imgType}
            display: inline-block
            vertical-align: top
            width: $size = sizeArr[index]
            height: $size
            margin-right: marginRArr[index]
            background-size: $size $size
            background-repeat: no-repeat
            for typeStr in typeStrArr
                &.{typeStr}
                    bg-image(typeStr + '_' + imgType)
</style>
