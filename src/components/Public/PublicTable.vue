<!--记录表格-->
<template>
    <el-table
        :data="TableData"
        size="mini"
        border
        stripe
        :header-cell-style="headerCell"
        :row-class-name="tableRowClassName"
        @selection-change="handleChange"
        style="width: 100%">
      <template v-for="(label, $label) in TableLabel">
        <el-table-column v-if="label.isType === 'selection'" type="selection" :width="label.width"></el-table-column>
        <el-table-column v-if="label.isType === 'column'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span :style="`color: ${label.color}`">{{scope.row[label.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'defaults'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span :style="`color: ${label.color}`">{{scope.row[label.prop] || label.defaults}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'html'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span :style="`color: ${label.color}`" v-html="scope.row[label.prop]"></span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'number'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span :style="`color: ${label.color}`">{{ scope.row[label.prop] | YMR}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'per'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span :style="`color: ${label.color}`">{{ scope.row[label.prop] | per}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'money'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span :style="`color: ${label.color}`">{{ scope.row[label.prop] | grouping}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'scope'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span  v-for="lists in label.status" :key="lists.label" v-if="lists.state === scope.row[label.prop] " :style="`color: ${lists.color}`">{{lists.label}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'profit'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <span>{{ scope.row.type !== '员工佣金' ? '' : scope.row.staff_id_name }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'popover'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <PopoverBox
            :PopoverRow="scope.row"
            :PopoverData="label.popover"
            @cancel="cancel"
            @mine="mine"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'button'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <template v-for="(btn, $btn) in label.btnArr">
              <el-button v-show="scope.row.privilege !== 'all'" v-if="btn.status === scope.row[btn.isShow]" :size="btn.size" :type="btn.type" @click="handleDelete(btn.evenName, scope.row, btn.attr, scope.$index)" :key="btn.label">{{btn.label}}</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'image'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <div @click="enlargeImg(scope.row)" >
              <img :src="scope.row[label.prop]"  style="height: 80px;padding: 10px 10px" alt="推广二维码">
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="label.isType === 'autoSort'" :prop="label.prop" :label="label.label" :width="label.width" :key="$label">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row[label.prop]" :ref="label.prop" @blur="modalshow('r' + label.prop, scope.row, scope.row[label.prop])"></el-input>
          </template>
        </el-table-column>
      </template>
    </el-table>
</template>
<script>
  export default {
    mixins: [],
    props: ['TableData', 'TableLabel'],
    data () {
      return {
      }
    },
    mounted () {},
    destroyed () {
    },
    watch: {},
    methods: {
      headerCell () {
        return 'headerCell'
      },
//    排序
      modalshow (prop, row, val) {
        let queryData = {}
        queryData.id = row.id
        queryData.displayorder = val
        let el = this
        el.$http(el.$api.getDisorder, queryData)
          .then((res) => {
            this.$emit('autoSort', res.code)
            if (res.code === 1) {
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (evenName, row, attr, index) {
        this.$emit(evenName, row, attr, index)
      },
//    选项
      handleChange (val) {
        this.$emit('handleChange', val)
      },
      tableRowClassName ({row, rowIndex}) {
        this.$emit('tableRowClassName', row, rowIndex)
      },
//    提示
      mine (val) {
        this.$emit('Determine', val)
      },
      cancel (val) {
        this.$emit('Getrid', val)
      },
      enlargeImg (val) {
        this.$emit('enlargeImg', val)
      }
    }
  }
</script>
<style scoped>
</style>
