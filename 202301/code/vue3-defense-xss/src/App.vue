<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-useless-escape
const xssText = ref(`<script> console.log( 'cookie数据为',  document.cookie ) <\/script>`)

// alert(document.cookie)
</script>

<template>
  <!-- 表达式无害,因为会通过createTextNode处理成纯字符串 -->
  <div>
    {{ xssText }} 
  </div>
  <!-- 使用v-html有害,会执行脚本文件 -->
  <div v-html="xssText">
  </div>
</template>

<style scoped lang="scss">
</style>
