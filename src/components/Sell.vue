<template>
  <div class="sell-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品售价" required prop="price">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" required prop="unit">
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.userLoad.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item label="" :wrapperCol="{ span: 24 }" prop="status1">
        <a-checkbox v-model="form.status1"> 是否上架 </a-checkbox>
      </a-form-model-item>
      <a-form-model-item label="" :wrapperCol="{ span: 24 }">
        <a-button style="margin-right: 10px" @click="prev">上一步</a-button
        ><a-button type="primary" @click="next">完成</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import cate from "@/api/category";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ["form"],
  data() {
    return {
      rules: {},
      previewVisible: false,
      previewImage: "",
      fileList: [],
    };
  },
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map( (item,i) => {
        return {
          uid: i,
          name: `image${i}.png`,
          status: 'done',
          url: item,
        }
      })
    }
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    prev() {
      this.$emit("prev");
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList, event }) {
    //   console.log("change:", file, fileList, event);
      if (file.status === "done") {
        // 提交成功
        let url = file.response.data.url;
        this.form.images.push(url);
      } else if (file.status === "removed") {
        // 删除成功
        let reurl = file.response.data.url;
        this.form.images = this.form.images.filter((it) => {
          return it !== reurl;
        });
      }

      this.fileList = fileList;
    },
  },
};
</script>

<style>
</style>