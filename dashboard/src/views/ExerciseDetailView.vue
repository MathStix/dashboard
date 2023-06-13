<template>
  <Header/>
  <section class="page-wrap">
    <div class="container-fluid pacer">
      <div class="row mt-5 pt-5">
        <h1>{{ exercise.title }}</h1>
        <p class="mt-4 mb-4" >{{ exercise.description }}</p>
        <p>Opdracht type: {{ exercise.exerciseType }}</p>
      </div>
      <div class="container-fluid pacer mt-5">
        <div class="row">
          <div class="col-6">
            <img :src="exercise.getImage()" alt="game-img">
          </div>
          <div class="col-6">
            <div class="map">
              <div id="map-root" style="width: 100%; min-width: 100%; height: 500px; min-width: 500px;" />
              <div id="marker"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import { useRoute } from 'vue-router';
import { getExercise } from '@/assets/javascript/api/exerciseApi';
import type { Exercise } from '@/assets/javascript/models/exercise';
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import { createExercise } from '@/assets/javascript/api/exerciseApi';
import {useGeographic} from 'ol/proj';

import 'ol/ol.css';


export default defineComponent({
  data() {
    return {
      map: null as null | Map,
      position: [5.077966, 51.538129],
      title: '',
      titleError: '',
      description: '',
      descError: '',
      answer: '',
      answerError: '',
      img: null as File | null,
      imgType: '',
      imageError: '',
      exerciseType: 'Text',
    }
  },
  components: {
    Header
  },
  async setup() {
    const route = useRoute();
    const reslut = await getExercise(route.params.id.toString())
    const exercise: Exercise = reslut?.data

    return{
      exercise
    }
  },
  mounted() {
    useGeographic();
    const locationSplit = this.exercise.location.replace(' ','').split(',')
    const LAT: number = parseFloat(locationSplit[0])
    const LUN: number = parseFloat(locationSplit[1])
    const LATLUN: number[] = [];
    LATLUN.push(LUN)
    LATLUN.push(LAT)
    this.position = LATLUN

    this.map = new Map({
      target: 'map-root',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        zoom: 17,
        center: LATLUN,
        constrainResolution: true
      }),
    })

    this.map.addOverlay(
      new Overlay({
        position: LATLUN,
        positioning: 'center-center',
        element: document.getElementById('marker')!,
        stopEvent: false,
      })
    )
  },
})
</script>

<style lang="scss" scoped>
  @import "../assets/styles/pages/addExercise.scss";
</style>