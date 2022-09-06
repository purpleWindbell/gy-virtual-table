
<template>
  <div class="app-container ">
    <div class="list-header" :class="hasScroll?'p-r-15':''">
      <div v-for="(item ,index) in tableHeader" :key="index" :style="{width:item.width?item.width:''}">{{ item.label }}</div>
    </div>
    <div class="list-body" id="table-body">
      <VirtualList :data="data" :item-h="itemH" :view-h="scrollH < viewH?(scrollH?scrollH+1:35 ):viewH ">
        <template slot="component" slot-scope="scope">
          <div v-for="(item ,index) in scope.list" :key="index" class="list-items">
            <div v-for="(head ,i) in tableHeader " :key="i" :style="{width:head.width?head.width:''}">
              <span v-if="head.type == 'select'">{{ item[head.prop] }}</span>
              <el-button
                v-else-if="head.type == 'button'"
                size="mini"
                type="text"
              >{{ head.buttonText }}</el-button>
              <el-button
                v-else-if="head.type == 'del'"
                size="mini"
                type="text"
                @click.stop="handleDelete(head, item)"
              >删除</el-button>
              <span v-else>{{ item[head.prop] }}</span>
            </div>
          </div>
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script>
import VirtualList from './VirtualList'
export default {
  name: 'VirtualTable',
  components: { VirtualList },
  props: {
    tableHeader: { // 列表总数据
      type: Array,
      default: () => []
    },
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
      defaultWidth: '50px',
      hasScroll:false
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        // 默认展示几个
        this.scrollH = this.data.length * this.itemH
        this.list = this.data.slice(0, this.showNum)
      }
    }
  },
  created() {
    // 初始化计算
    this.scrollH = this.data.length * this.itemH
    // 计算可视化高度一次能装几个列表, 多设置几个防止滚动时候直接替换
    this.showNum = Math.floor(this.viewH / this.itemH) + 4
    // 默认展示几个
    this.list = this.data.slice(0, this.showNum)
    this.lastTime = new Date().getTime()
  },
  mounted() {
    let element= document.getElementById('table-body')
    this.hasScroll = this.scrollH > element.scrollHeight
  },
  methods: {
     hasScrolled(element, direction) {
        if (direction === 'vertical') {
            return element.scrollHeight > element.clientHeight;
        } else if (direction === 'horizontal') {
            return element.scrollWidth > element.clientWidth;
        }
    },
    handleDelete({ method }, row) {
      return method(row)
    },
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
.t-a-c {
    text-align: center;
}
.list-header {
    display: flex;
    // padding: 0px 15px;
    background-color: #F8F8F9;
     border: 1px solid #DFE6EC;
    border-bottom: none;
    div{
        flex: 1;
        display: inline-block;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 13px;
        border-right:1px solid #DFE6EC;
    }
}
.list-body {
    border: 1px solid #DFE6EC;
    border-top: none;
    .app-container {
        padding-top: 0px;
        padding-right: 0px;
    }
}
/deep/ ::-webkit-scrollbar {
  width: 15px;
  height: 10px;
 }
 /deep/ ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
 }
.list-items {
    border-bottom:1px solid #DFE6EC;
     display: flex;
    div{
        flex: 1;
        display: inline-block;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 13px;
        border-right:1px solid #DFE6EC;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
}
.empty {
    margin-top: 10px;
    display: inline-block;
}
.m-b-10 {
  margin-bottom: 10px;
}
.p-r-15 {
  padding-right: 15px;
}
</style>
