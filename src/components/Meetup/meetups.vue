<template>
    <v-container>
        <v-layout row wrap 
        v-for=" hangout in hangouts"
        :key="hangout.id" class="mb-3">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
               <v-card class="info">
                   <v-container fluid>
                       <v-layout row>
                           <v-flex xs5 sm4 md3>
                               <v-card-media
                                   height="130px"
                                   :src="hangout.imageUrl"
                               ></v-card-media>
                           </v-flex>      
                           <v-flex xs7 sm8 md9>
                               <v-card-title primary-title>
                                <div>
                                    <h2 class="white--text title">{{hangout.title}}</h2>
                                    <div>{{hangout.date}}</div>
                                </div>
                               </v-card-title> 
                               <v-card-actions>
                                   <v-btn flat :to="'/meetups/' + hangout.id">
                                       <v-icon left light>arrow_forward</v-icon>
                                       View Hangout</v-btn>
                               </v-card-actions>                              
                           </v-flex>                     
                       </v-layout>
                   </v-container>
               </v-card>                 
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed:{
        hangouts () {
            return this.$store.getters.loadedHangouts
        }
    }

}
</script>

<style>

</style>
