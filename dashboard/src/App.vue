<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <!-- main content -->
        <main>
          <component :is="Component"></component>
        </main>

        <!-- loading state -->
        <template #fallback>
          <div class="loading">
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
        </template>
      </Suspense>
    </template>
  </RouterView>
  <div class="loading main">
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
</template>