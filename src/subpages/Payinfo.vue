<style scoped>
.table-label {
  display: block;
  font-weight: bold;
  font-size: 1.2em;
  margin: 20px;
}
.submit-form {
  margin-top: 20px;
}
</style>
<template>
 <div>
   <Row>
     <Col :span="24">
     <label class="table-label">当前公众号支付设置</label>
      <Table size="small" border :columns="columns1" :data="data1"></Table>
     </Col>
     
     <Col :span="24">
     <label class="table-label">当前APP支付设置</label>
      <Table size="small" border :columns="columns1" :data="data2"></Table>
     </Col>
     <Col :span="12">
     </Col>
     <Col :span="12">
     </Col>
     <Col class="submit-form" :span="24">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="请输入修改密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')">确认修改</Button>
          </FormItem>
      </Form>
     </Col>
   </Row>
 </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "支付种类",
          key: "type"
        },
        {
          title: "支付标题",
          key: "label"
        },
        {
          title: "支付金额",
          key: "price"
        },
        {
          title: "增加数量",
          key: "addition"
        }
      ],
      data1: [
        {
          type: "ghtype1",
          label: "20张房卡",
          price: "30",
          addition: "20"
        },
        {
          type: "ghtype2",
          label: "30张房卡",
          price: "45",
          addition: "30"
        },
        {
          type: "ghtype3",
          label: "60张房卡",
          price: "90",
          addition: "60"
        }
      ],
      data2: [
        {
          type: "apptype1",
          label: "房卡10赠2",
          price: "30",
          addition: "12"
        },
        {
          type: "apptype2",
          label: "房卡20赠6",
          price: "60",
          addition: "26"
        },
        {
          type: "apptype3",
          label: "房卡60赠28",
          price: "180",
          addition: "88"
        },
        {
          type: "apptype4",
          label: "房卡80赠48",
          price: "240",
          addition: "128"
        },
        {
          type: "apptype5",
          label: "房卡120赠108",
          price: "360",
          addition: "228"
        },
        {
          type: "apptype6",
          label: "房卡160赠168",
          price: "480",
          addition: "328"
        }
      ],
      formInline: {
        password: ""
      },
      ruleInline: {
        password: [
          {
            required: true,
            message: "请输入正确的修改密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不能少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  beforeMount() {
    this.$http.get("/admin/getRecentPayInfos").then(res => {
      console.log(res.data);
      this.payInfos = res.data.payInfos;
    });
  },
  components: {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>


