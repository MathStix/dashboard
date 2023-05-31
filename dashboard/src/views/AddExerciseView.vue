<script lang="ts" setup>
import Header from '../components/Header.vue';
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import { createExercise } from '@/assets/javascript/api/exerciseApi';
import { Exercise } from '@/assets/javascript/models/exercise';
import {useGeographic} from 'ol/proj';
import {
  validateDescription, validateFile, errSubmit, errTitleEmp,
  errTitle, errDescriptionEmp, errDescription, errImageEmp, errImage
} from '../assets/javascript/validation';

import 'ol/ol.css';
</script>

<template>
  <Header/>
  <section class="page-wrap">
    <div class="container-fluid pacer">
      <div class="row mt-5 pt-5">
        <div class="col-12">
          <h1>Add a new Exercise</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="inner">
            <form @submit.prevent="submit">
              <div class="form-group mt-3">
                <label>Exercise title</label>
                <input 
                  type="text"
                  class="form-control"
                  placeholder="Enter exercise title"
                  required
                  v-model="title"
                  @blur="checkTitle"
                  @keyup="checkTitle"
                >
                <div class="feedback" v-if="titleError">
                  <span class="small">
                    {{ titleError }}
                  </span>
                </div>
              </div>
              <div class="form-group mt-3">
                <label>Exercise description</label>
                <textarea
                  cols="10" 
                  rows="5"
                  required
                  class="form-control"
                  placeholder="Enter exercise description"
                  v-model="description"
                  @blur="checkDescription"
                  @keyup="checkDescription"
                ></textarea>
                <div class="feedback" v-if="descError">
                  <span class="small">
                    {{ descError }}
                  </span>
                </div>
              </div>
              <div class="form-group mt-3">
                <label>Exercise answer</label>
                <input 
                  type="text"
                  class="form-control"
                  placeholder="Enter the expected answer"
                  required
                  v-model="answer"
                  @blur="checkAnswer"
                  @keyup="checkAnswer"
                >
                <div class="feedback" v-if="answerError">
                  <span class="small">
                    {{ answerError }}
                  </span>
                </div>
              </div>
              <div class="form-group mt-3">
                <input class="form-control" type="file" accept="image/*" @change="checkImage">
                <div class="feedback" v-if="imageError">
                  <span class="small">
                    {{ imageError }}
                  </span>
                </div>
              </div>
              <div class="form-group mt-3">
              <label>Select a exercise type</label>
                <select class="form-select" v-model="exerciseType">
                  <option selected value="Text">Text</option>
                  <option value="Photo">Photo</option>
                </select>
              </div>
              <div class="form-group mt-3">
                <button class="btn btn-main">
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="inner">
            <p>Select a location for the exercise</p>
            <div id="map-root" style="width: 100%; min-width: 100%; height: 500px" />
            <div id="marker"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
      img: '',
      imgType: '',
      imageError: '',
      exerciseType: 'Text',
    }
  },
  mounted() {
    useGeographic();
    this.map = new Map({
      target: 'map-root',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        zoom: 15,
        center: this.position,
        constrainResolution: true
      }),
    })

    this.addPointer()

    this.map.on('click', (e) => {
      this.mapClick(e);
    });
  },
  methods: {
    mapClick(e: MapBrowserEvent<any>){
      this.position = e.coordinate
      console.log(e.coordinate)
      this.addPointer()
    },
    addPointer(){
      this.map!.addOverlay(
        new Overlay({
          position: this.position,
          positioning: 'center-center',
          element: document.getElementById('marker')!,
          stopEvent: false,
        })
      )
    },
    checkImage(e: any) {
      this.img = e.target.files[0]
      this.imgType = e.target.files[0].type.split('/')
      this.imgType = this.imgType[1]
      this.valitImage()
    },
    valitImage(){
      this.imageError = this.img == '' ? errImageEmp() : (
        validateFile(this.imgType) ? '' : errImage()
      )
    },
    checkTitle(){
      this.titleError = this.title == '' ? errTitleEmp() : (
        validateDescription(this.title) ? '' : errTitle(this.title)
      )
    },
    checkDescription(){
      this.descError = this.description == '' ? errDescriptionEmp() : (
        validateDescription(this.description) ? '' : errDescription(this.description)
      )
    },
    checkAnswer(){
      this.answerError = this.answer == '' ? 'Answer can not be left empty.' : ''
    },
    async submit(){
      this.valitImage()
      this.checkTitle()
      this.checkDescription()
      this.checkAnswer()

      if(this.titleError == '' && this.descError == '' && 
      this.imageError == '' && this.answerError == '') {
        const exercise = new Exercise(0, this.title, this.description, 
          this.answer, `${this.position[1]}, ${this.position[0]}`, null, '20', 
          this.exerciseType, sessionStorage.getItem('user')
        )
        exercise.genarateBase64(this.img);
        console.log(exercise);
        const result = await createExercise(exercise)

        console.log(result)
      }
    }
  },
})
</script>

<style lang="scss" scoped>
  @import "../assets/styles/pages/addExercise.scss";
</style>