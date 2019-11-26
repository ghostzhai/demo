<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="openModal">Modal测试</button>
    <button @click="color='red'">红色</button>
    <button @click="color='blue'">蓝色</button>
    <button @click="color='orange'">橘黄色</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { provide, ref } from "@vue/composition-api";
export default {
  name: "app",
  components: {
    HelloWorld
  },
  methods:{
    openModal(){
      this.$open('textModal',{
        p1:'消息1',
        p2:'消息2'
      },function () {
        
      })
    }
  },
  setup() {
    const color = ref("yellow");
    provide("gloabColor", color);
    return {
      color
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
