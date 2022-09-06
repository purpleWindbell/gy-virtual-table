<!--
 * @Description: 
 * @StartVersion: 2.0
 * @LastVersion: 2.0
 * @Autor: gaoyue
 * @Date: 2022-09-05 17:24:53
 * @LastEditTime: 2022-09-06 11:41:47
-->
<template>
  <div id="app" style="width:200px">
    <VirtualTable
          :data="selectionList"
          :item-h="35"
          :view-h="viewH"
          :table-header="tableFormat"
        >
        </VirtualTable>
  </div>
</template>

<script>
import VirtualTable from './packages/gy-virtual-table/VirtualTable'

export default {
  name: 'App',
  components: {
    VirtualTable
  },
  data() {
    return {
      viewH:300,
      selectionList:[],
      tableFormat: [
            {
              label: '姓名',
              prop: 'name',
              type: 'input',
              filterSort: 2
            },
            {
              label: '工号',
              prop: 'code'
            },
            // {
            //   label: '职位',
            //   prop: 'code'
            // },
            //  {
            //   label: '职位',
            //   prop: 'code'
            // },
      ]
    }
  }, 
  created() {
    // for(let i = 0; i < 1;i++) {
    //   this.selectionList.push({name:'111',code:'222'})
    // }
  }
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
