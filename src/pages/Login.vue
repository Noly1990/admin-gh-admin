<template>
 <div class="login-box">
   <Card style="width:320px">
        <div slot="title">
          <p>嘻游娱乐公众号后台</p>
        </div>
        
        <div style="text-align:center">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
            </FormItem>
        </Form>
        </div>
    </Card>
 </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码至少6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http.post('/admin/login',{
            username: this.formInline.user,
            password: this.formInline.password
          }).then(res => {
            console.log(res.data)
            if (res.data.code > 0) {
              this.$store.dispatch("UserLogin", {
                username: this.formInline.user,
                token: res.data.token
              });
              this.$router.push('/index')
            } else {
              this.$Message.error("用户名或密码错误")
            } 
          })
          
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style scoped>
.login-box {
  width: 320px;
  margin: 100px auto;
}
</style>
