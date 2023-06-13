<template>
  <Header/>
  <div v-auto-animate>
    <section class="page-wrap" v-if="game">
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
              <h2>Teams <span class="small">Totaal verdeelde spelers: {{ (teams.length * 2) - 2 + teams[teams.length - 1].playerIds!.length }}</span></h2>
            </div>
            <div class="wrapper team-wrap">
              <span v-if="teams?.length == 0">
                Er zijn nog geen teams gemaakt.
              </span>
              <div class="team mb-5" v-else v-for="team in teams" :key="team._id">
                <p><b>{{ team.name }}</b></p>
                <RouterLink class="btn btn-main" :to="{name: 'answers', params:{id: team._id}}">
                  <span>Bekijk antwoorden</span>
                </RouterLink>
                <div class="players">
                  <span v-html="avatar()" v-for="player in team.playerIds" :key="player"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-else></div>

    <div class="loading" v-if="loading">
      <div class="wrapper">
        <div class="inner">
          <div class="loader">
            <svg viewBox="0 0 80 80">
              <circle id="test" cx="40" cy="40" r="32"></circle>
            </svg>
          </div>

          <div class="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>

          <div class="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>
        <div class="txt text-center mt-4">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
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
  data() {
    return {
      loading: false
    }
  },
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
  mounted() {
    this.loading = false
  },
  methods: {
    async startTheGame(){
      this.loading = true
      const result = await startGame(this.game._id!)
      this.game = ref(result?.data)
      this.loading = false
      this.$forceUpdate();
    },
    async sortTeams(){
      this.loading = true
      const result = await genarateTeams(this.game._id!, 2)
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
        this.loading = false
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