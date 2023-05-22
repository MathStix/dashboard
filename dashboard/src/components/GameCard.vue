<script setup lang="ts">
defineProps({
  Descriptin: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <div class="inner">
      <div class="img-wap">
        <img src="https://placehold.co/600x400" alt="game-img">
      </div>
      <p>{{ Descriptin }}</p>  
      <a class="btn btn-main mt-4">
        <span>
          View
        </span>
      </a>   
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/game-card.scss";
</style>