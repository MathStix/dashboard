<script lang="ts" setup>
import Header from '../components/Header.vue';
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Overlay from 'ol/Overlay'
import 'ol/ol.css'
</script>

<template>
  <Header/>
  <section class="page-wrap">
    <!-- <div class="row">
      <div class="col-12">
        <h1>Add a new Exercise</h1>
      </div>
    </div>
    <form>
      <input type="text">
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <input type="text">
      <input type="text">
      <input type="file" name="" id="">
      
    </form> -->
    <div id="map-root" style="width: 100%; height: 500px" />

    <div id="marker"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type MapBrowserEvent from 'ol/MapBrowserEvent';
export default defineComponent({
  data() {
    return {
      map: null as null | Map,
      position: [565337.2186614156, 6717020.904759425],
    }
  },
  mounted() {
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
  },
})
</script>

<style scoped>
#marker {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background:url(https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png) no-repeat top center;
  background-size:100%;
  opacity: 1;
  cursor: move;
}
</style>