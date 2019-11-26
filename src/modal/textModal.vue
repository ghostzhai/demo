<template>
    <a-modal
            title="Basic Modal"
            :visible="show"
            @ok="handleOk"
            @cancel="handleClose"
    >
        <p>{{ p1 }}</p>
        <p>{{ p2 }}</p>
        <p>Some contents...</p>
    </a-modal>
</template>

<script>
  export default {
    name: 'TestModal1',
    props: ['p1', 'p2'],
    data () {
      return {
        show: true
      }
    },
    watch: {
      p1: function () {
        this.show = this.p1
      }
    },
    created () {
    },
    destroyed () {
    },
    methods: {
      handleOk () {
        this.$close({
          msg: 'close it'
        })
      },
      handleClose () {
        this.$close(false)
      }
    }
  }
</script>

<style scoped>

</style>
