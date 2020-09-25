import Vue from 'vue'
import VueI18n from 'vue-i18n'
import util from '@/libs/util'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const localeElementUI = require(`element-ui/lib/locale/lang/${locales(key)._element}`)
      messages[locale] = {
        ...locales(key),
        ...localeElementUI ? localeElementUI.default : {}
      }
    }
  })
  return messages
}

const messages = loadLocaleMessages()

Vue.prototype.$languages = Object.keys(messages).map(language => ({
  label: messages[language]._name,
  value: language
}))

export default new VueI18n({
  locale: util.cookies.get('lang') || process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-chs',
  silentTranslationWarn: true,
  messages
})
