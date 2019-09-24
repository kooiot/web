<template>
  <d2-container>
    <demo-page-header
      slot="header"
      @submit="fetchData"
      ref="header"/>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :rowHandle="rowHandle"
      edit-title="修改网关"
      :edit-template="editTemplate"
      @d2-data-change="handleDataChange"
      @row-edit="handleRowEdit"
      @row-setting="handleRowSetting"
      @dialog-cancel="handleDialogCancel"
      style="margin: -15px 0;"/>
    <demo-page-footer
      slot="footer"
      :current="pagination.currentPage"
      :size="pagination.pageSize"
      :total="pagination.total"
      @change="handlePaginationChange"/>
  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
import { fetch } from '@api/iot.gateways'
import BetaMode from './componnets/BetaMode'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'iot-gateways',
  components: {
    'DemoPageHeader': () => import('./componnets/PageHeader'),
    'DemoPageFooter': () => import('./componnets/PageFooter')
  },
  computed: {
    columns () {
      return [
        {
          title: this.$t('Name'),
          key: 'dev_name',
          width: '240'
        },
        {
          title: this.$t('Description'),
          key: 'description'
        },
        {
          title: this.$t('APPS'),
          key: 'device_apps_num',
          width: '60'
        },
        {
          title: this.$t('Status'),
          key: 'device_status',
          width: '100'
        },
        {
          title: this.$t('Status Timestamp'),
          key: 'last_updated',
          width: '160'
        },
        {
          title: this.$t('Beta'),
          key: 'use_beta',
          width: '120',
          component: {
            name: BetaMode
          }
        }
      ]
    },
    rowHandle () {
      return {
        columnHeader: this.$t('Operations'),
        align: 'center',
        width: 360,
        edit: {
          icon: 'el-icon-edit',
          text: 'Edit',
          size: 'mini'
        },
        custom: [
          {
            icon: 'el-icon-settings',
            text: 'Settings',
            size: 'mini',
            emit: 'row-setting'
          }
        ],
        remove: {
          icon: 'el-icon-delete',
          text: 'Delete',
          size: 'mini',
          confirm: true,
          show (index, row) {
            if (!row.forbidRemove) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidRemove) {
              return true
            }
            return false
          }
        }
      }
    },
    editTemplate () {
      return {
        dev_name: {
          title: 'Name',
          value: ''
        },
        description: {
          title: 'Description',
          value: ''
        },
        use_beta: {
          title: '检查状态（点击进行修改）',
          value: 0,
          component: {
            name: BetaMode
          }
        }
      }
    }
  },
  data () {
    return {
      table: [],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
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
        if (data.hasOwnProperty(key)) this[key] = data[key]
      }
      this.$message.success('loadDataFromDb')
    },
    handlePaginationChange (val) {
      // this.$notify({
      //   title: '分页变化',
      //   message: `当前第${val.current}页 共${val.total}条 每页${val.size}条`
      // })
      this.pagination = val
      // nextTick 只是为了优化示例中 notify 的显示
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData (category) {
      this.loading = true
      fetch({
        ...this.pagination
      }).then(res => {
        this.data = res.list
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    handleDataChange (data) {
      console.log(data)
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowSetting ({ index, row }, done) {
      console.log(row.name)
      // this.goToEditPage('demo-business-issues-142-edit', row.name)
      this.goToEditPage('iot-gateways-settings', row.name)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
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
