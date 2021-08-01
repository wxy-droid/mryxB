<template>
  <div class="forget-container">
    <h1>《忘记密码》</h1>
    <a-form-model
      class="forget-form"
      ref="forgetForm"
      :model="forgetForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="forgetForm.email" placeholder="必填" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="forgetForm.password"
          type="password"
          autocomplete="off"
          placeholder="必填"
        />
      </a-form-model-item>

      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="forgetForm.code" placeholder="必填" />
      </a-form-model-item>
      <a-button style="margin:0 0 10px 90px" type="primary" @click="handleCode"
        >发送验证码</a-button
      >


      <a-form-model-item class="forget-btn">
        <a-button type="primary" @click="passForm('forgetForm')">
          确认提交
        </a-button>
        <a-button type="primary" @click="submitForm"> 返回登陆 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
  <!--  -->
</template>
<script>
import userAxios from "@/api/user.js";
export default {
  data() {
    // 邮箱
    let emailReg = /^[\w-]+@[\w.-]+.com$/;
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (emailReg.test(value)) {
        callback();
      } else {
        callback(new Error("邮箱格式不正确"));
      }
    };
    // 密码
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length > 5 && value.length < 14) {
        callback();
      } else {
        callback(new Error("密码长度不正确"));
      }
    };
    // 验证码
    let validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    return {
      forgetForm: {
        password: "",
        email: "",
        code: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        code: [{ validator: validateCode, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    handleCode() {
      userAxios.getCode({ email: this.forgetForm.email })
      .then( resp => {
        this.$message.success(resp.msg);
      })
      .catch( err => {
        this.$message.error(err);
      })

    },
    passForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            userAxios.getPass(this.forgetForm)
            .then( resp => {
                alert(resp.msg);
                this.$router.push({
                    name : 'Login'
                })
            })
            .catch(err => {
                this.$message.error(err);
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm() {
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/logon.less");
</style>