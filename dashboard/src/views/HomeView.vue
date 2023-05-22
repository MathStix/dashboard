<script setup lang="ts">
import Header from '../components/Header.vue';
import GameCard from '../components/GameCard.vue';
</script>

<template>
  <section>
    <Header/>
    <div class="page-wrap">
      <div class="container-fluid pacer">
        <div class="inner-wrap">
          <div class="btn-wrap">
            <a class="btn btn-main mt-4">
              <span>
                Start new game
              </span>
            </a>
            <a class="btn btn-main mt-4">
              <span>
                Add Questions
              </span>
            </a>
          </div>
          <section class="currgames game-slide">
            <h1>
              Ongoing games
            </h1>
            <div class="slide">
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
            </div>
          </section>
          <section class="games game-slide">
            <h2>
              Ended games
            </h2>
            <div class="slide">
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
              <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" />
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>