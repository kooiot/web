<template>
  <d2-container>
    <demo-page-header
      slot="header"
      @submit="handleSubmit"
      ref="header"/>
    <demo-page-main
      :table-data="table"
      :loading="loading"/>
    <demo-page-footer
      slot="footer"
      :current="page.pageCurrent"
      :size="page.pageSize"
      :total="page.pageTotal"
      @change="handlePaginationChange"/>
  </d2-container>
</template>

<script>
import { fetch } from '@api/gateways'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'iot-gateways',
  components: {
    'DemoPageHeader': () => import('./componnets/PageHeader'),
    'DemoPageMain': () => import('./componnets/PageMain'),
    'DemoPageFooter': () => import('./componnets/PageFooter')
  },
  data () {
    return {
      table: [],
      loading: false,
      page: {
        pageCurrent: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    const category = to.meta.category
    if (category) {
      next(async instance => {
        if (from.name === 'demo-business-issues-142') {
          await instance.getFormData(category)
          instance.saveDataToDb()
        } else {
          instance.loadDataFromDb(to)
        }
      })
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    const category = to.meta.category
    if (category) {
      this.loadDataFromDb(to)
      next()
    } else {
      next(new Error('未指定ID'))
    }
  },
  methods: {
    getFormData (category) {

    },
    resetFormData () {

    },
    // 将页面数据同步到持久化存储
    saveDataToDb () {
      this.pageSet({ instance: this, user: true })
    },
    // 从持久化存储恢复数据到页面
    async loadDataFromDb (to) {
      const instance = {
        $route: {
          fullPath: to.fullPath
        },
        $data: {}
      }
      const data = await this.pageGet({
        instance,
        user: true
      })
      for (const key in data) {
        if (data.hasOwnProperty(key)) this[key] = data[key]
      }
      this.$message.success('loadDataFromDb')
    },
    handlePaginationChange (val) {
      this.$notify({
        title: '分页变化',
        message: `当前第${val.current}页 共${val.total}条 每页${val.size}条`
      })
      this.page = val
      // nextTick 只是为了优化示例中 notify 的显示
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    handleSubmit (form) {
      this.loading = true
      this.$notify({
        title: '开始请求模拟表格数据'
      })
      fetch({
        ...form,
        ...this.page
      })
        .then(res => {
          this.loading = false
          this.$notify({
            title: '模拟表格数据请求完毕'
          })
          this.table = res.list
          this.page.pageTotal = res.page.total
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '模拟表格数据请求异常'
          })
          console.log('err', err)
        })
    }
  }
}
</script>
