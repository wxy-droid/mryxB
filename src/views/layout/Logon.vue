<template>
  <div class="logon-container">
    <h1>《每日优鲜注册》</h1>
    <a-form-model
      class="logon-form"
      ref="logonForm"
      :model="logonForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="logonForm.email" placeholder="必填" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="logonForm.password"
          type="password"
          autocomplete="off"
          placeholder="必填"
        />
      </a-form-model-item>

      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="logonForm.code" placeholder="必填" />
      </a-form-model-item>
      <a-button style="margin-left: 90px" type="primary" @click="handleCode"
        >发送验证码</a-button
      >

      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="logonForm.username" placeholder="必填" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="角色" prop="role">
        <a-input
          v-model="logonForm.role"
          placeholder="customer代表普通用户 admin:代表管理员用户"
        />
      </a-form-model-item>

      <a-form-model-item class="logon-btn">
        <a-button type="primary" @click="resetForm('logonForm')">
          立即注册
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
    // 用户名
    let validateUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      logonForm: {
        password: "",
        email: "",
        code: "",
        username: "",
        role: "admin",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        code: [{ validator: validateCode, trigger: "change" }],
        username: [{ validator: validateUser, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    handleCode() {
      userAxios.getCode({ email: this.logonForm.email })
      .then( resp => {
        this.$message.success(resp.msg);
      })
      .catch( err => {
        this.$message.error(err);
      })

    },
    resetForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userAxios
            .logon(this.logonForm)
            .then((resp) => {
              alert(resp.msg);
              this.$router.push({
                name: "Login",
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