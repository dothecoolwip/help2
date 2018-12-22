<template>


<!-- buttons at the top -->
    <v-container xs12>
        <v-layout align-center justify-center row text-xs-center wrap >
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
                <v-btn large router to="/meetups">Explore Hangouts</v-btn>
            </v-flex>

            <v-flex xs12 sm6 class="text-sm-left text-xs-center">
                <v-btn large router to="/meetup/new">Organize a Hangout</v-btn> 
            </v-flex>                          
        </v-layout>
<v-layout>
  <v-flex xs12 class="text-xs-center">
    <v-progress-circular
      indeterminate
      color="black"
     :width="7"
     :size="70"
     v-if="loading"
    ></v-progress-circular>
  </v-flex>  
</v-layout>
<!-- carousel -->
        <v-layout row wrap  v-if="!loading">
            <v-flex xs12>
                <v-carousel hide-delimiters="" class="mt-3 mb-2" style="cursor: pointer">
                    <v-carousel-item
                    hide-delimiters=""
                    v-for="hangout in hangouts"
                    :src="hangout.imageUrl"
                    :key="hangout.id"
                    @click="onLoadHangout(hangout.id)"
                    >
                    <div class="title">
                        {{hangout.title}}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>                
        </v-layout>
<!-- text after the carousel -->
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <p>join our awesome hangouts</p>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    computed:{
        hangouts () {
            return this.$store.getters.featuredHangouts
        },
        loading(){
            return this.$store.getters.loading
        }

    },
  methods: {
    onLoadHangout (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
.title{
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
    
}

</style>
/* eslint-disable */ 