<template>
    <div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 99">
        <div class="loading">
          <img src="../../assets/loading.gif" alt="">
        </div>
    </div>
</template>
<script>
  export default {
    mixins: [],
    props: [],
    data () {
      return {}
    },
    mounted () {
    },
    destroyed () {
    },
    watch: {},
    methods: {
    }
  }
</script>
<style scoped>
  .loading{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
