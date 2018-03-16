<!--搜索框-->
<template>
  <el-form :inline="true" :model="searchModel" class="demo-form-inline">
    <template v-for="(seatch, $seatch) in searchData">
      <el-form-item :label="seatch.label" :key="$seatch">
        <el-input  v-if="seatch.isType === 'input'" :size="searchConfig.size" v-model="searchModel[seatch.model]" :placeholder="seatch.placeholder"></el-input>
        <el-select v-if="seatch.isType === 'select'" :size="searchConfig.size" v-model="searchModel[seatch.model]" :placeholder="seatch.placeholder">
          <el-option v-for="(lsit, $lsit) in seatch.selectArr"  :label="lsit.label" :value="lsit.value" :key="$lsit"></el-option>
        </el-select>
        <el-date-picker v-if="seatch.isType === 'time'" :size="searchConfig.size" v-model="searchModel[seatch.model]" :placeholder="seatch.placeholder"
            type="daterange"
            range-separator="/"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy - MM - dd "
            value-format="yyyy-MM-dd">
        </el-date-picker>
        <template v-if="seatch.isType === 'button'" v-for="btn in seatch.buttonArr">
          <upData v-if="btn.isType || btn.isType === 'up'" style="display: inline-block;margin: 0 12px"
          :upConfig="upConfig"
          ></upData>
          <el-button v-else :key="btn.evenText" :size="searchConfig.size" :type="btn.type" @click="onSubmit(btn.evenName, searchModel, btn.attr)">{{btn.evenText}}</el-button>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
  import upData from '../Tool/upDate.vue'
  export default {
    mixins: [],
    props: ['searchModel', 'searchData', 'searchConfig', 'upConfig'],
    components: {upData},
    data () {
      return {
//        searchModel: {},
//        searchData: [
//          {isType: 'input', label: '', model: '', placeholder: ''},
//          {isType: 'select', label: '', model: '', placeholder: '', selectArr: [{label: '', shanghai: ''}]},
//          {isType: 'button', label: '', model: '', placeholder: '', type: '', evenName: ''}
//        ]
      }
    },
    mounted () {},
    destroyed () {
    },
    watch: {},
    methods: {
      onSubmit (name, val, attr) {
        this.$emit(name, val, attr)
      }
    }
  }
</script>
<style scoped>
  .el-menu{
    text-align: left;
    height: 600px;
  }
  .el-table .cell .textVertical{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
