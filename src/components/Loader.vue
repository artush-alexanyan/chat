<template>
  <div id="app"  class="ml-5">
    <v-app id="inspire">
      <v-main class="ml-5">
        <v-container
          fluid
          fill-height
          class="ml-5"
        >
          <v-layout
            align-center
            justify-center
          >
            <v-flex
              xs12
              sm8
              md4
              class="ml-5"
            >
                  <v-layout row wrap class="ml-5">
                    <v-flex xs12 class="ml-5">
                        <v-progress-circular
                            class="ml-5"
                          :size="50"
                          color="primary"
                          indeterminate
                        ></v-progress-circular>
                    </v-flex>
                  </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>   
</template>
<script>
  export default {
    data () {
      return {
        interval: {},
        value: 0,
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },
  }
</script>

<style>
  .grid-list-md{
    margin-left: 110px;
    margin-top: 200px;;
  }
</style>
<v-container grid-list-md text-xs-center>

