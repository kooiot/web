<template>
  <d2-container>
    <gateway-page-header
      slot="header"
      @submit="fetchData"
      ref="header"/>
    <gateway-page-main
      :table-data="table"
      :loading="loading"/>
    <gateway-page-footer
      slot="footer"
      :current="page.pageCurrent"
      :size="page.pageSize"
      :total="page.pageTotal"
      @change="handlePaginationChange"/>
  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'iot-gateways',
  components: {
    GatewayPageHeader: () => import('./componnets/PageHeader'),
    GatewayPageMain: () => import('./componnets/PageMain'),
    GatewayPageFooter: () => import('./componnets/PageFooter')
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
          await instance.fetchData(category)
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
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('d2admin/db', [
      'pageSet',
      'pageGet'
    ]),
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
        this[key] = data[key]
      }
      this.$message.success('loadDataFromDb')
    },
    async handlePaginationChange (val) {
      this.$notify({
        title: '分页变化',
        message: `当前第${val.current}页 共${val.total}条 每页${val.size}条`
      })
      this.page = {
        pageCurrent: val.current,
        pageSize: val.size,
        pageTotal: val.total
      }
      // nextTick 只是为了优化示例中 notify 的显示
      await this.$nextTick()
      this.$refs.header.handleFormSubmit()
    },
    fetchData (form) {
      this.loading = true
      this.$notify({
        title: '开始请求模拟表格数据'
      })
      this.$api.IOT_GATEWAY_LIST({
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
    },
    // 跳转到编辑页面
    goToEditPage (name, id) {
      this.$router.push({
        name,
        params: {
          id
        }
      })
    }
  }
}
</script>
