<template>
  <div>
    <!--
    <el-form
      :inline="true"
      size="mini">
      <el-form-item :label="`已选数据下载 [ ${currentTableData.length} ]`">
        <el-button-group>
          <el-button
            type="primary"
            size="mini"
            :disabled="currentTableData.length === 0"
            @click="handleDownloadXlsx(currentTableData)">
            xlsx
          </el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="currentTableData.length === 0"
            @click="handleDownloadCsv(currentTableData)">
            csv
          </el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item :label="`已选数据下载 [ ${multipleSelection.length} ]`">
        <el-button-group>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadXlsx(multipleSelection)">
            xlsx
          </el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadCsv(multipleSelection)">
            csv
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    -->
    <el-table
      :data="currentTableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column :label="$t('Gateway SN')" width="240"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.sn}}
        </template>
      </el-table-column>

      <el-table-column :label="$t('Description')" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>

      <el-table-column :label="$t('APPS')" width="60" align="center">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            type="success">
            {{scope.row.value}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Status')" width="50" align="center">
        <template slot-scope="scope">
          <boolean-control
            :value="scope.row.type"
            @change="(val) => {
              handleSwitchChange(val, scope.$index)
            }">
            <d2-icon
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
              slot="active"/>
            <d2-icon
              name="times-circle"
              style="font-size: 20px; line-height: 32px; color: #F56C6C;"
              slot="inactive"/>
          </boolean-control>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Status')" width="50" align="center">
        <template slot-scope="scope">
          <boolean-control-mini
            :value="scope.row.type"
            @change="(val) => {
              handleSwitchChange(val, scope.$index)
            }">
            <d2-icon
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
              slot="active"/>
            <d2-icon
              name="times-circle"
              style="font-size: 20px; line-height: 32px; color: #F56C6C;"
              slot="inactive"/>
          </boolean-control-mini>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Status Timestamp')" width="140" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.dateTimeCreat}}
        </template>
      </el-table-column>

      <el-table-column :label="$t('Status')" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.status === 'ONLINE' ? 'success' : ( scope.row.status === 'OFFLINE' ? 'warning' : 'info' )">
            {{scope.row.status ? $t(scope.row.status) : $t('Unactived')}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="tag"
        label="Tag"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BooleanControl from '../BooleanControl'
import BooleanControlMini from '../BooleanControlMini'
export default {
  components: {
    BooleanControl,
    BooleanControlMini
  },
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data () {
    return {
      currentTableData: [],
      multipleSelection: [],
      downloadColumns: [
        { label: '卡密', prop: 'key' },
        { label: '面值', prop: 'value' },
        { label: '状态', prop: 'type' },
        { label: '管理员', prop: 'admin' },
        { label: '管理员备注', prop: 'adminNote' },
        { label: '创建时间', prop: 'dateTimeCreat' },
        { label: '使用状态', prop: 'used' },
        { label: '使用时间', prop: 'dateTimeUse' },
        { label: '标签', prop: 'tag' }
      ]
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
    filterTag (value, row) {
      return row.tag === value
    },
    handleSwitchChange (val, index) {
      const oldValue = this.currentTableData[index]
      this.$set(this.currentTableData, index, {
        ...oldValue,
        type: val
      })
      // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    downloadDataTranslate (data) {
      return data.map(row => ({
        ...row,
        type: row.type ? '禁用' : '正常',
        used: row.used ? '已使用' : '未使用'
      }))
    },
    handleDownloadXlsx (data) {
      this.$export.excel({
        title: 'D2Admin 表格示例',
        columns: this.downloadColumns,
        data: this.downloadDataTranslate(data)
      })
        .then(() => {
          this.$message('导出表格成功')
        })
    },
    handleDownloadCsv (data) {
      this.$export.csv({
        title: 'D2Admin 表格示例',
        columns: this.downloadColumns,
        data: this.downloadDataTranslate(data)
      })
        .then(() => {
          this.$message('导出CSV成功')
        })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
