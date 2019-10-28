<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>{{count}}</p>
        <p>{{name}}</p>
        <p :style="{color: gloabColor}">{{gloabColor}}</p>
        <child></child>
    </div>
</template>

<script>
  /* eslint-disable no-alert, no-console */
  import { reactive,toRefs,onMounted,watch ,inject} from '@vue/composition-api'
  import child from './child'
  export default {
    components: {
      child
    },
    props: {
      msg: String
    },
    setup () {
      const gloabColor = inject('gloabColor')
      const state = reactive({count: 0,name:'xiao'})
      // const count = ref('ste')
      // const state1 = reactive({
      //   count
      // })
       //1.监听reactive 类型的一个数据
      // watch(()=>state.count,(count, prevCount)=>{
      //   // count  新值
      //   // prevCount  旧值
      //   console.log(count)
      //   console.log(prevCount)
      // })
      //1.监听reactive 类型的多个数据
      watch(Object.values(toRefs(state)),([count, name], [prevCount, prevName])=>{
        console.log(count) // 新的 count 值
        console.log(name) // 新的 name 值
        console.log('------------')
        console.log(prevCount) // 旧的 count 值
        console.log(prevName) // 新的 name 值
      },{
        lazy: true // 在 watch 被创建的时候，不执行回调函数中的代码
      })
      setTimeout(() => {
        state.count++
        state.name = 'lilili'
        // 输出 1
      }, 1000)
      onMounted(()=>{
        console.log('onMounted')
      })
      return {
        ...toRefs(state),
        gloabColor
      }
    },
    beforeCreate () {
      // console.log('beforeCreate')
    },
    created () {
      // console.log('created')
    }
  }
  /* eslint-disable no-alert, no-console */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
