<!--卡片-->
<template>
    <el-tabs v-model="activeName" class='scrollbars'style="padding-left: 15px">
      <el-tab-pane v-for="(item, $index) in listData" :key="$index" :label="item.label" :name="item.name">
        <ul style="max-height: 300px;overflow: auto;" class="scrollbar">
          <li v-for="(items, $index) in item.content" class="tabPane"  :key="$index" @click="handleSys(items)">
            <h4 :class="items.is_read_status === 0 ? 'texth4' : '' " v-text="items.title"></h4>
            <!--<div v-text="items.content" ></div>-->
            <el-tooltip class="item" effect="dark" :content="items.content" placement="top-start">
              <el-button type="text" size="mini" class="font-text">{{items.content}}</el-button>
            </el-tooltip>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
</template>
<script>
  export default {
    mixins: [],
    props: ['listData'],
    data () {
      return {
        activeName: '0'
      }
    },
    mounted () {},
    destroyed () {},
    watch: {},
    methods: {
      handleSys (items) {
        let el = this
        let queryData = {}
        let i = 0
        if (el.activeName === '0') {
          i = 0
        } else {
          i = 1
        }
        queryData.id = items.id
        el.$http(el.$api.getSmg, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.listData[i].content.forEach((o, i) => {
                if (items.id === o.id) {
                  items.is_read_status = 1
                  let item = {}
                  item.items = items
                  item.type = 1
                  el.$emit('redNum', item)
                }
              })
            } else if (res.code === '') {
              if (res.msg === 'failok') {
                let item = {}
                item.items = items
                item.type = 0
                el.$emit('redNum', item)
              }
            }
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>
  .scrollbar::-webkit-scrollbar{
    color: transparent;
  }
  .scrollbars {
    box-shadow: 0 0 11px #333;
  }
  .texth4:before{content: '';display: inline-block;width: 6px;height: 6px;border-radius: 50%;position: relative;top:-13px;left: 0;background: red}
  .tabPane{text-align: left;margin: 5px 8px;width: 320px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;cursor: pointer;line-height: 13px}
  .font-text{overflow: hidden;white-space: nowrap;text-overflow:ellipsis;}
</style>
