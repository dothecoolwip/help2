<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3 class="display-1 font-weight-medium">{{ hangout.title }}</h3>
                    </v-card-title>
                    <v-card-media
                        height="400px"
                        :src="hangout.imageUrl"
                    ></v-card-media>
                    <v-card-text>
                        <v-layout row>
                            <v-flex xs12 class="info--text headline text-capitalize">
                                Location: {{hangout.location}} <br/>       
                                Date: {{hangout.date}} <br/>
                                Time: {{hangout.time}}
                            </v-flex>

                        </v-layout>
                        <div class="title">{{hangout.description}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed:{
        hangout () {
            return this.$store.getters.loadedHangout(this.id)
        }
    }

}

</script>

<style>

</style>
