<template>
    <v-main class="d-flex justify-content-center">
         <div class="d-flex justify-content-center ml-5">
            <v-btn>Test </v-btn>
         </div>
         <div class="d-flex justify-content-center ml-5">
  
    <v-container fluid px-0>
     
      <v-switch
        :label="`Switch 1: ${switch1.toString()}`"
        v-model="switch1"
                color="#f45525"
      ></v-switch>
       <v-switch
        :label="`Switch 2: ${switch2.toString()}`"
        v-model="switch2"
                color="rgb(0,150,45)"
      ></v-switch>
    <div class="loader">
        <v-icon>mdi-chat</v-icon>
    </div>      
    </v-container>

         </div>         
    </v-main>
</template>

<script>
  export default {
  data () {
    return {
   
      switch1: true,
      switch2: true
    }
  }
  }
</script>
