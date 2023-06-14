<script lang="ts" setup>
import { getAnswers, getTeam } from '@/assets/javascript/api/gameApi';
import type { Answer } from '@/assets/javascript/models/answer';
import type { Team } from '@/assets/javascript/models/team';
import Header from '@/components/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const reslut = await getAnswers(route.params.id.toString())
const answers: Answer[] = reslut?.data

const res = await getTeam(route.params.id.toString())
const team: Team = res?.data

for (let i = 0; i < answers.length; i++) {
  await answers[i].getExercise()
}
</script>

<template>
  <Header/>
  <section class="page-wrap" v-if="answers" v-auto-animate>
    <div class="container-fluid pacer">
      <div class="back" @click="() => { $router.back() }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </div>
      <div class="row">
        <div class="col-12">
          <h1>Antwoorden van groep: {{ team.name }}</h1>
        </div>
      </div>
      <div class="row mt-5 pt-3">
        <div class="col-md-4 mb-5" v-for="answer in answers" :key="answer._id">
          <div class="answer-card">
            <div class="inner" :class="answer.exercise!.exerciseType"> 
              <div class="head">
                <p>
                  <b>{{ answer.exercise!.title }}</b>
                </p>
                <p>{{ answer.exercise!.description }}</p>
              </div>
              <div class="body">
                <div class="text" v-if="answer.texts[0].length > 2">
                  <span v-for="text in answer.texts">{{ text.replace("[", "").replace("]", "").replace('"', "").replace('"', "") }}</span>
                </div>
                <div class="photo" v-else>
                  <img v-for="img in answer.photos" :src="answer.getImage(img)" @click="openImg(answer.getImage(img))">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bigImg" v-if="bigImg" @click="closeImg">
      <svg @click="closeImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
      <div class="inner-imgwrap">
        <img @click.stop :src="img">
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      bigImg: false,
      img: ''
    }
  },
  methods: {
    openImg(imgSrc: string){
      this.bigImg = true
      this.img = imgSrc
    },
    closeImg(){
      this.bigImg = false;
      this.img = ''
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/pages/answer.scss';
</style>