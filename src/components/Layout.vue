<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.my-layout-header {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0 30px;
  overflow: hidden;
}

.user-trigger {
  float: right;
}

.r-link {
  color: inherit;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <router-link class="r-link" to="/index/">
                        <MenuItem @click.native="collapseItem" name="1-1">
                            <Icon type="ios-navigate"></Icon>
                            <span>数据总览</span>
                        </MenuItem>
                    </router-link>
                    <router-link class="r-link" to="/index/users">
                    <MenuItem @click.native="collapseItem" name="1-2">
                        <Icon type="ios-people"></Icon>
                        <span>用户浏览</span>
                    </MenuItem>
                    </router-link>
                    <router-link class="r-link" to="/index/payinfo">
                    <MenuItem @click.native="collapseItem" name="1-3">
                        <Icon type="card"></Icon>
                        <span>支付设置</span>
                    </MenuItem>
                    </router-link>
                    <router-link class="r-link" to="/index/setting">
                    <MenuItem @click.native="collapseItem" name="1-4">
                        <Icon type="settings"></Icon>
                        <span>设置</span>
                    </MenuItem>
                    </router-link>
                    <router-link class="r-link" to="/index/mine">
                    <MenuItem @click.native="collapseItem" name="1-5">
                        <Icon type="person"></Icon>
                        <span>个人中心</span>
                    </MenuItem>
                    </router-link>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar my-layout-header">
                    嘻游娱乐公众号管理后台
                    <div class="user-trigger">
                        <user-avatar></user-avatar>
                    </div>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '720px'}">
                    <slot></slot>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import UserAvatar from "@/components/UserAvatar";
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  components: { UserAvatar },
  methods:{
      collapseItem(){
          if (window.innerWidth < 500) {
            this.isCollapsed = true
          } 
      }
  }
};
</script>