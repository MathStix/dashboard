<script lang="ts" setup>
import Header from '../components/Header.vue';
import { createCourse } from '@/assets/javascript/api/courseApi';
import { Course } from '@/assets/javascript/models/course';
import {
  validateDescription, errSubmit, errTitleEmp,
  errTitle, errDescriptionEmp, errDescription, validateTitle
} from '../assets/javascript/validation';
</script>

<template>  
  <Header/>
  <section class="page-wrap">
    <div class="container-fluid pacer">
      <div class="row">
        <div class="col-12 text-center">
          <h1>Add a new course</h1>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-lg-4 col-md-7">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label>Course title</label>
              <input 
                class="form-control" 
                type="text" 
                placeholder="Enter a course title" 
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
            <div class="form-group mt-4">
              <label>Course description</label>
              <textarea 
                placeholder="Enter a course description" 
                cols="10" 
                rows="3"
                required
                class="form-control"
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
              <button class="btn btn-main">
                <span>Save</span>
              </button>
            </div>
          </form>
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
      title: '',
      titleError: '',
      description: '',
      descError: '',
    }
  },
  methods: {
    checkTitle() {
      this.titleError = this.title == '' ? errTitleEmp() : (
        validateTitle(this.title) ? '' : errTitle(this.title)
      )
    },
    checkDescription(){
      this.descError = this.description == '' ? errDescriptionEmp() : (
        validateDescription(this.description) ? '' : errDescription(this.description)
      )
    },
    async submit(){
      this.checkTitle()
      this.checkDescription()

      if(this.titleError == '' && this.descError == ''){
        const reslut = await createCourse(new Course(null, this.title, this.description, sessionStorage.getItem('user')!, null))
        const course: Course = reslut?.data
        if(reslut?.code == 201){
          this.$router.push({name: 'fillCourse', params: { id: course._id }})
        }
      }
    }
  },
})
</script>

<style lang="scss" scoped>
  @import "../assets/styles/pages/addExercise.scss";
</style>