<template>
  <Header/>
  <section class="page-wrap">
    <div class="container-fluid pacer">
      <div class="row between mt-5 pt-5">
        <div class="col-md-6 mt-5">
          <div class="start-wrap">
            <a @click="startTheGame" class="btn btn-main">
              <span>Spel starten.</span>
            </a>
            <p v-if="game.isStarted" class="started">Spel gestart.</p>
            <p v-else>Spel niet gestart.</p>
          </div>
        </div>
        <div class="col-md-6 mt-5">
          <div class="info-wrap">
            <h1>Join code: {{ game.code }}</h1>
            <p>Woord om te raden: {{ game.word }}</p>
          </div>
        </div>
      </div>
      <div class="row mt-5 pt-5">
        <div class="col-md-7">
          <div class="exercise-wrap between mb-4">
            <h2>Opdrachten in het spel.</h2>
            <RouterLink class="btn btn-main" :to="{name:'fillCourse', params:{id: course._id}}">
              <span>Bewerk opdrachten lijst</span>
            </RouterLink>
          </div>
          <div class="wrapper">
            <ExerciseCard class="card" v-for="exercise in course.exercises" :exercise="exercise" :key="exercise._id" />
          </div>
        </div>
        <div class="col-md-5">
          <div class="exercise-wrap between mb-4">
            <h2>Spelers <span class="small">Totaal aanal spelers: {{ game.playerIds?.length }}</span></h2>
            <a class="btn btn-main" @click="sortTeams">
              <span>Verdeel spelers</span>
            </a>
          </div>
          <div class="wrapper">
            <span v-if="game.playerIds?.length == 0">
              Er zijn nog geen spelers.
            </span>
            <div class="player" v-else v-for="player in  game.playerIds">
              <span v-html="avatar()"></span>
            </div>
          </div>
          <div class="exercise-wrap between mt-5 pt-2">
            <h2>Teams <span class="small">Totaal verdeelde spelers: {{ teams.length * 3 }}</span></h2>
          </div>
          <div class="wrapper team-wrap">
            <span v-if="teams?.length == 0">
              Er zijn nog geen teams gemaakt.
            </span>
            <div class="team mb-5" v-else v-for="team in teams" :key="team._id">
              <p><b>{{ team.name }}</b></p>
              <a class="btn btn-main">
                <span>Bekijk antwoorden</span>
              </a>
              <div class="players">
                <span v-html="avatar()" v-for="player in team.playerIds" :key="player"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getCourse } from '@/assets/javascript/api/courseApi';
import type { Course } from '@/assets/javascript/models/course';
import { getGame, startGame, getTeam, genarateTeams } from '@/assets/javascript/api/gameApi';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import type { Game } from '@/assets/javascript/models/game';
import ExerciseCard from '@/components/ExerciseCard.vue';
import { ref, type Ref } from 'vue'
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { Team } from '@/assets/javascript/models/team';

import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Header, ExerciseCard
  },
  async setup() {
    const route = useRoute();
    const reslutGame = await getGame(route.params.id.toString())
    const game: Ref<Game> = ref(reslutGame?.data)

    const reslutCourse = await getCourse(game.value?.courseId!)
    const course: Ref<Course> = ref(reslutCourse?.data)
    const teams: Ref<Team[]> = ref<Team[]>([])

    if(game.value.teamIds!.length > 0){
      const newTeams: Team[] = []
      for(let i = 0; i < game.value.teamIds!.length; i++){
        const reponse = await getTeam(game.value.teamIds![i])
        const team: Team = reponse?.data
        newTeams.push(team)
      }
      teams.value = newTeams
    }

    return {
      game, course, teams
    }
  },
  methods: {
    async startTheGame(){
      const result = await startGame(this.game._id!)
      this.game = ref(result?.data)
      this.$forceUpdate();
    },
    async sortTeams(){
      const result = await genarateTeams(this.game._id!, 3)
      console.log(result)
      if(result?.code == 201){
        const reslutGame = await getGame(this.game._id!)
        this.game = ref(reslutGame?.data)

        if(this.game.teamIds!.length > 0){
          const newTeams: Team[] = []
          for(let i = 0; i < this.game.teamIds!.length; i++){
            const reponse = await getTeam(this.game.teamIds![i])
            const team: Team = reponse!.data
            newTeams.push(team)
          }
          this.teams = newTeams
        }

        this.$forceUpdate();
      }
    },
    avatar(){
      let avatar: any = ''

      avatar = createAvatar(avataaars, {
        seed: Math.random().toString(36).substring(2,7),
        randomizeIds: true
      });
      
      return avatar.toString();
    },
  },
})
</script>

<style scoped lang="scss">
@import "../assets/styles/pages/gameDetail.scss";
</style>