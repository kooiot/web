<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="handleClick">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  computed: {
    type () {
      return this.value === 1 ? 'success' : 'danger'
    },
    text () {
      return this.value === 1 ? this.$t('Yes') : this.$t('No')
    }
  },
  methods: {
    handleClick () {
      this.$emit('input', this.value === 1 ? 0 : 1)
    }
  }
}
</script>
