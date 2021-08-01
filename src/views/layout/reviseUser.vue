<template>
  <div class="reviseUser-container">
    <h1>《修改用户信息》</h1>
    <a-form-model
      class="reviseUser-form"
      ref="reviseUserForm"
      :model="reviseUserForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="reviseUserForm.email" placeholder="必填" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="旧密码" prop="password">
        <a-input
          v-model="reviseUserForm.password"
          type="password"
          autocomplete="off"
          placeholder="必填"
        />
      </a-form-model-item>

      <a-form-model-item has-feedback label="新密码" prop="newPassword">
        <a-input
          v-model="reviseUserForm.newPassword"
          type="password"
          autocomplete="off"
          placeholder="必填"
        />
      </a-form-model-item>

      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="reviseUserForm.code" placeholder="必填" />
      </a-form-model-item>
      <a-button style="margin-left: 90px" type="primary" @click="handleCode"
        >发送验证码</a-button
      >

      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="reviseUserForm.username" placeholder="必填" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="角色" prop="role">
        <a-input
          v-model="reviseUserForm.role"
          placeholder="customer代表普通用户 admin:代表管理员用户"
        />
      </a-form-model-item>

      <a-form-model-item class="reviseUser-btn">
        <a-button type="primary" @click="resetForm('reviseUserForm')">
          确认修改
        </a-button>
        <a-button type="primary" @click="homeForm"> 返回首页 </a-button>
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
      reviseUserForm: {
        password: "",
        newPassword: "",
        email: "",
        code: "",
        username: "",
        role: "",
      },
      rules: {
        jpassword: [{ validator: validatePass, trigger: "change" }],
        newPassword: [{ validator: validatePass, trigger: "change" }],
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
      userAxios.getCode({ email: this.reviseUserForm.email })
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
            .getChangeUserInfo(this.reviseUserForm)
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
    homeForm() {
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/logon.less");
</style>