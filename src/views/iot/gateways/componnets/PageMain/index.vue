<template>
  <d2-crud
    ref="d2Crud"
    :columns="columns"
    :data="data"
    :rowHandle="rowHandle"
    :edit-template="editTemplate"
    @d2-data-change="handleDataChange"
    @row-edit="handleRowEdit"
    @row-setting="handleRowSetting"
    @dialog-cancel="handleDialogCancel"/>
</template>

<script>
import BetaMode from '../BetaMode'
export default {
  components: {
  },
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
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
            name: 'beta-mode'
          }
        }
      }
    }
  },
  data () {
    return {
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
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
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功111',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    }
  }
}
</script>
