<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'white',
  },
  bgColor: {
    type: String,
    default: '#7679a2',
  },
})
</script>

<template>
  <span class="tag-container" :style="{ color, backgroundColor: bgColor }">
    {{ tag }}
  </span>
</template>

<style scoped>
.tag-container {
  display: inline-block;
  padding: 0.5rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  text-align: center;
  background-color: #7679a2;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}
</style>
