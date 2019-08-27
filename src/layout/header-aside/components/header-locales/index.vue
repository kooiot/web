<template>
  <el-dropdown
    placement="bottom"
    size="small"
    @command="onChangeLocale">
    <el-button class="d2-mr btn-text can-hover" type="text">
      <d2-icon name="language" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(language, index) in $languages"
        :key="index"
        :command="language.value">
        <d2-icon :name="$i18n.locale === language.value ? 'dot-circle-o' : 'circle-o'" class="d2-mr-5"/>
        {{ language.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    onChangeLocale (command) {
      this.$i18n.locale = command
      let message = `${this.$t('Current Language')}：${this.$t('_name')} [ ${this.$i18n.locale} ]`
      if (!['TRAVIS', 'NETLIFY'].includes(process.env.VUE_APP_BUILD_MODE)) {
        message = [
          this.$t('Current language') + `：${this.$t('_name')} [ ${this.$i18n.locale} ]`,
          this.$t('Switching language only, no detailed language settings'),
          this.$t('Document reference') + `：<a class="el-link el-link--primary is-underline" target="_blank" href="https://doc.d2admin.fairyever.com/zh/sys-locales/">《国际化 | D2Admin》</a>`
        ].join('<br/>')
      }
      this.$notify({
        title: this.$t('Language switched'),
        dangerouslyUseHTMLString: true,
        message
      })
    }
  }
}
</script>
