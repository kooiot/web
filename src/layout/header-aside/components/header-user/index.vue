<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? $t('Welcome') + ` ${info.name}` : $t('Guest')}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff" v-if="info.name!==undefined">
        <d2-icon name="power-off" class="d2-mr-5"/>
        {{$t('Logout')}}
      </el-dropdown-item>
      <el-dropdown-item @click.native="logIn" v-if="info.name===undefined">
        <d2-icon name="sign-in" class="d2-mr-5"/>
        {{$t('Login')}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    logIn () {
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>
