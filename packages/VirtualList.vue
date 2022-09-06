<!--
 * @Description: 
 * @StartVersion: 2.0
 * @LastVersion: 2.0
 * @Autor: gaoyue
 * @Date: 2022-09-05 17:41:03
 * @LastEditTime: 2022-09-06 11:50:24
-->

<template>
  <div class="app-container">
    <div :style="`height:${viewH}px;overflow-y: auto;`" id="out-list" @scroll="handleScroll">
      <div :style="`height:${scrollH}px`" class="list">
        <div class="item_box" :style="`transform:translateY(${offsetY}px)`">
          <slot name="component" :list="list"></slot>
          <div v-show="!data||data.length ==0" class="empty ">{{ emptyText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',
  props: {
    data: { // 列表总数据
      type: Array,
      default: () => []
    },
    viewH: { // 外部高度
      type: Number,
      default: () => 400
    },
    itemH: { // 单项高度
      type: Number,
      default: () => 20
    },
    emptyText: {
      type: String,
      default: () => '暂无数据'
    }
  },
  data() {
    return {
      scrollH: '', // 整个滚动列表高度
      list: [], // 每次显示的数据
      showNum: '',
      offsetY: '', // 动态偏移量- 外层的盒子进行滚动设置
      lastTime: '',
      hasScroll:false
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        // 默认展示几个
        this.showNum = Math.floor(this.viewH / this.itemH) + 4
        this.scrollH = this.data.length * this.itemH || '20'
        this.list = this.data.slice(0, this.showNum)
      }
    },
    viewH(val) {
      console.log('val---', val)
    }
  },
  created() {
    console.log('val---', this.viewH)
    // 初始化计算
    this.scrollH = this.data.length * this.itemH || '20'
    // 计算可视化高度一次能装几个列表, 多设置几个防止滚动时候直接替换
    this.showNum = Math.floor(this.viewH / this.itemH) + 4
    // 默认展示几个
    this.list = this.data.slice(0, this.showNum)
    this.lastTime = new Date().getTime()
  },
  mounted() {
    //  let element= document.getElementById('out-list')
    // this.hasScroll = this.scrollH > element.scrollHeight
    // console.log('scrollH', this.scrollH,element.scrollHeight)
  },
  methods: {
    handleScroll(e) {
      if (new Date().getTime() - this.lastTime > 10) {
        const scrollTop = e.target.scrollTop // 滚动条的宽度
        // 每一次滚动后根据scrollTop值获取一个可以整除itemH结果进行偏移
        // 例如: 滚动的scrllTop = 1220  1220 % this.itemH = 20  offsetY = 1200
        this.offsetY = scrollTop - (scrollTop % this.itemH)
        this.list = this.data.slice(
          Math.floor(scrollTop / this.itemH), // 计算卷入了多少条
          Math.floor(scrollTop / this.itemH) + this.showNum
        )
        this.lastTime = new Date().getTime()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.empty {
    text-align: center;
    font-size: 12px;
    margin: 10px;
}
.o-y-s {
  overflow-y: scroll;
}
.o-y-a {
   overflow-y: auto;
}
</style>
