<template>
    <div class="avatar-box">
        <Avatar @click.native="toggle" size="large" class="avatar-img">Admin</Avatar>
        <div :class="['pop-down',{ 'active':visible}]">
            <ButtonGroup vertical>
            <Button @click="gotoMine" type="primary" size="small">个人中心</Button>
            <Button @click="loginOut" type="error" size="small">退出登陆</Button>
            </ButtonGroup>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        visible:false
    };
  },
  components: {},
  methods: {
      toggle() {
          this.visible=!this.visible
      },
      gotoMine(){
          this.visible=!this.visible
          this.$router.push('/index/mine')
      },
      loginOut(){
          this.$store.dispatch("UserLoginOut");
          this.$router.push('/login')
      }
  }
};
</script>

<style scoped>

.avatar-img {
    background-color: orange;
    cursor: pointer;
}
.pop-down {
    display: none;
    position: absolute;
    top: 50px;
    right: 20px;
    z-index: 5;
}

.active {
    display: block;
}
</style>

