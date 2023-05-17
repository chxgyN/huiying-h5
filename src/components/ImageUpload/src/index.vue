<template>
  <div class="upload-container">
    <div class="avatar-wrapper" @click="chosenFileHandle">
      <img class="avatar" v-if="src" :src="src" />
    </div>

    <!-- 头像图片选择 -->
    <!-- 
      type为 file点击事件会打开文件
      选择完图片后
      input的value值会自动更新成选择图片路径
      此时会触发change事件 
    -->
    <input
      type="file"
      name="file"
      accept="image/*"
      ref="fileInput"
      class="upload-input"
      @change="fileChangeHandle"
    />

    <!-- 头像裁剪 -->
    <div class="avatar-modal" v-if="isShowCrop">
      <div class="crop-image">
        <crop-image
          ref="cropImage"
          @on-change="submitAvatar"
          :img="avatarImg"
          :loading="uploading"
        />
      </div>
      <!-- <span slot="footer">
        <m-button @click="isShowAvatar = false">
          取 消
        </m-button>
        <m-button type="primary" @click="cropImage()" :loading="uploading">
          确 定
        </m-button>
      </span> -->
    </div>
  </div>
</template>

<script>
import { getQiniuUpToken } from "@/api/common";
import * as qiniu from "qiniu-js";
import CropImage from "./CropImage";
import { FILE_DOMAIN } from "@/config";

export default {
  name: "ImageUpload",

  components: {
    CropImage,
  },

  props: {
    src: {
      type: String,
    },
  },

  data() {
    return {
      isShowAvatar: false,
      avatarImg: null,
      uploading: false,
    };
  },

  computed: {
    isShowCrop() {
      return this.$route.hash === "#avatar";
    },
  },

  methods: {
    // 触发选择文件事件
    chosenFileHandle() {
      this.avatarImg = "";  
      // 初始化触发 input 标签的点击事件
      let evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      // 将点击事件派发给 input 标签，触发 input 标签点击事件
      this.$refs.fileInput.dispatchEvent(evt);
    },

    // 选择完图片后确定就触发
    fileChangeHandle(evt) {
      // 保证数组小于等于1并且第一个值不为空
      if (evt.target.files.length > 1 || !evt.target.files[0]) return;
      const file = evt.target.files[0];
      if (file.size > 1024 * 1024 * 10) {
        this.$message.warning("头像图片不能超过 10MB");
        return;
      }
      if (file.size < 1024 * 2) {
        this.$message.warning("头像图片不能小于 2KB");
        return;
      } 
      // 因为有模态框所以不需要预览显示
      // 页面预览图片
      // let url = URL.createObjectURL(file);
      // // 加载显示图片
      // let img = new Image();
      // // 加载完毕后释放
      // img.onload = () => {
      //   URL.revokeObjectURL(url);
      // };
      // // 显示头像预览效果
      // this.isShowAvatar = true;
      this.avatarImg = URL.createObjectURL(file);
      // url中追加#avatar,计算属性判断是否显示模态框
      this.$router.push("#avatar");
    },

    // cropImage() {
    //   this.$refs.cropImage.clipImage();
    // },

    submitAvatar(file) {
      this.handleInsertImg(file);
    },

    // 头像上传
    // 在handleInsertImg方法中，调用getQiniuUpToken接口获取七牛云上传凭证。
    // 将裁剪后的图片文件上传到七牛云服务器，上传成功后获取图片的url，并通过$emit方法将url传递给父组件。
    // 上传成功后，关闭模态框，并通过$router.back()返回上一页。
    async handleInsertImg(file) {
      if(this.uploading == true) return
      this.uploading = true;
      const { code, data } = await getQiniuUpToken();
      if (code === 200) {
        const token = data;
        const key = null;
        const putExtra = {
          fname: "",
          params: {},
          mimeType: ["image/png", "image/jpeg", "image/gif"],
        };
        const config = {
          useCdnDomain: true, //使用cdn加速
        };
        // qiniu.upload 返回一个 observable 对象用来控制上传行为
        const observable = qiniu.upload(file, key, token, putExtra, config);
        // 开始上传
        observable.subscribe({
          error: () => {
            this.$message.danger("上传图片失败");
            this.uploading = false;
          },
          complete: ({ key }) => {
            let url = `${FILE_DOMAIN}/${key}@avatar`;
            this.isShowAvatar = false;
            this.uploading = false;
            this.$emit("on-change", url);
            this.$router.back();
          },
        });
      } else {
        this.uploading = false;
        this.$message.warning(code);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 4px;
  }
}

.upload-input {
  display: none;
}
</style>