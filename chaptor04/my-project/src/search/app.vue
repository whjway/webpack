<template>
  <div class="search">
    {{ a }}
    <el-button type="primary">主要按钮</el-button>
    <img
      src="@/search/images/city.jpg"
      width="300px"
      alt="123"
      @click="handleClick"
    />
    <img src="@/search/images/logo.png" alt="123" @click="handleClick" />
    <p v-if="importTxt">{{ importTxt }}</p>
  </div>
</template>
<script>
import { funca } from "./tree-shaking";
export default {
  data() {
    return {
      a: 1111111132444,
      importTxt: "",
    };
  },
  computed: {},

  created() {},
  methods: {
    handleClick() {
      import("./importTxt.js").then((res) => {
        console.log(res.data);
        this.importTxt = res.data.a;
      });
    },
  },
  mounted() {
    this.$alert("123");
    funca();
    console.log(a);
  },
};
</script>

<style lang="less">
.search {
  align-items: center;
  font-weight: bold;
  font-size: 30px;

  //background: url(./search/images/logo.png);
}
</style>
