<template>
  <div class="login-container">
    <h1>《每日优鲜登陆》</h1>
    <a-form-model
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          登陆
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('')">
          注册
        </a-button>
        <a-button style="margin-left: 10px" @click="passForm('')">
          忘记密码
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    // 邮箱
    let emailReg = /^[\w-]+@[\w.-]+.com$/;
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else if (emailReg.test(value)) {
        return callback();
      } else {
        return callback(new Error("邮箱格式不正确"));
      }
    };

    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length > 5 && value.length < 14) {
        callback();
      } else {
        callback(new Error("密码长度不正确"));
      }
    };

    return {
      loginForm: {
        password: "",
        email: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("userLoad/userLogin", this.loginForm)
            .then((resp) => {
              alert(resp.msg);
              this.$router.push({
                name: "Home",
              });
            })
            .catch((err) => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push({
        name: "Logon",
      });
    },
    passForm() {
      this.$router.push({
        name: "ForgetPass",
      });
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/login.less");
</style>
