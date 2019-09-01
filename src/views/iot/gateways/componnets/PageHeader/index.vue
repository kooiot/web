<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="Status" prop="type">
      <el-select
        v-model="form.status"
        placeholder="Status Select"
        style="width: 120px;">
        <el-option label="Online" value="ONLINE"/>
        <el-option label="Offline" value="OFFLINE"/>
        <el-option label="Unactived" value=""/>
      </el-select>
    </el-form-item>

    <el-form-item label="Search" prop="note">
      <el-input
        v-model="form.filter"
        placeholder="Enter Search Content"
        style="width: 180px;"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="handleFormSubmit">
        <d2-icon name="search"/>
        {{$t('Search')}}
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleFormReset">
        <d2-icon name="refresh"/>
        {{$t('Reset')}}
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        status: 'ONLINE',
        filter: ''
      },
      rules: {
        status: [ { required: true, message: '请选择一个状态', trigger: 'change' } ]
      }
    }
  },
  methods: {
    handleFormSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
