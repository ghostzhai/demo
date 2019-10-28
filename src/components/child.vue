<template>
    <div>
        <h5>子组件</h5>
        <h5 :style="{color: color}">{{color}}</h5>
    </div>
</template>

<script>
  import { inject } from '@vue/composition-api'

  export default {
    name: 'child',
    setup () {
      const color = inject('gloabColor')
      return {
        color
      }
    }
  }
</script>

<style scoped>

</style>