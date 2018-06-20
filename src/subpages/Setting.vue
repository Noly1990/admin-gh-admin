<style scoped>
  .model-box {
    margin: 20px auto;
    width: 300px;
    background-color: #aaa;
    height: 30px;
    
  }

  .buttons-show {
    margin: 30px auto;
  }

  .buttons-set {
    margin: 30px auto;
  }
  .warning {
    text-align: left;
  }
  .btn {
    background-color: white;
    padding: 10px 20px;
  }
</style>
<template>
  <div>
    <h3>公众号按钮设置</h3>
    <Row class="buttons">
      <Col :sm="24" :md="12" class="buttons-show">
      <h4>当前按钮</h4>
      <Row class="model-box">
        <Col span="8" class="btn1">
          <Dropdown trigger="click" @on-click="btn1Click">
            <a class="btn" href="javascript:void(0)">
                活动中心
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="1-1">赞我们一下</DropdownItem>
                <DropdownItem name="1-2">每日签到</DropdownItem>
                <DropdownItem name="1-3">幸运转盘</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col span="8" class="btn2">
          <Dropdown trigger="click">
            <a class="btn" href="javascript:void(0)">
                游戏服务
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>下载游戏</DropdownItem>
                <DropdownItem>游戏充值</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col span="8" class="btn3">
          <Dropdown trigger="click">
            <a class="btn" href="javascript:void(0)">
                自主服务
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>个人中心</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      </Col>
      <Col :sm="24" :md="12" class="buttons-set">
        <h4>修改区</h4>
      </Col>
    </Row>
    <h3>注意事项</h3>
    <Row>
      <Col class="warning">
      <p>1、自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。</p>
      <p>2、一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。</p>
      <P>3、创建自定义菜单后，菜单的刷新策略是，在用户进入公众号会话页或公众号profile页时，如果发现上一次拉取菜单的请求在5分钟以前，就会拉取一下菜单，如果菜单有更新，就会刷新客户端的菜单。测试时可以尝试取消关注公众账号后再次关注，则可以看到创建后的效果。</P>
      </Col>
    </Row>
  </div>
</template>

<script>
 export default {
   data() {
     return {

     }
   },
   beforeMount(){
     this.$http.get('/admin/getRecentBtnInfos').then(res=>{
       console.log(res.data)
       this.btnInfos = res.data.btnInfos
     })
   },
   components: {

   },
   methods: {
    btn1Click(item){
      console.log('btn1 click',item)
    }
   }
}
</script>
