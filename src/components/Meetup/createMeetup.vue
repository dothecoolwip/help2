<template>
    <v-container>
        <v-layout row >
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="display-1">Create a new Hangout</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateHangout">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>


                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>


                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn raised @click="onPickFile">Upload Image</v-btn>
                            <input type="file" 
                            style="display: none"
                            ref="fileInput" 
                            accept="image/*"
                            @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    
                    <!-- desktop -->
                    <v-layout row hidden-xs-only>
                        <v-flex xs12 sm6 offset-sm3>
                           <img :src="imageUrl" height="350"> 
                        </v-flex>
                    </v-layout>

                    <!-- mobile -->
                    <v-layout row hidden-sm-and-up>
                        <v-flex xs12 sm6 offset-sm3>
                           <img :src="imageUrl" height="200"> 
                        </v-flex>
                    </v-layout>


                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea                
                                name="description"
                                label="Description"
                                id="description"
                                
                                v-model="description"
                                required></v-textarea>
                        </v-flex>
                    </v-layout>

                    <v-layout row >
                        <v-flex xs12 sm6 offset-sm3>
                            <h4 class="title">Choose Date and time</h4>
                        </v-flex>                        
                    </v-layout>


                    <!-- Date -->
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3 >
                    <v-menu
                            ref="menu1"
                            :close-on-content-click="false"
                            v-model="menu1"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                            >
                            <v-text-field
                                slot="activator"
                                v-model="dateFormatted"
                                label="Date"
                                persistent-hint
                                prepend-icon="event"
                                @blur="date = parseDate(dateFormatted)"
                            ></v-text-field>
                            <v-date-picker v-model="date" 
                            no-title 
                            @input="menu1 = false"
                            :min="today"
                            ></v-date-picker>
                            </v-menu>

                        </v-flex>

                    </v-layout>

                    <!-- time -->
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3 >
                    <v-menu
                            ref="menu3"
                            :close-on-content-click="true"
                            v-model="menu4"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                            >
                            <v-text-field
                                slot="activator"
                                v-model="time"
                                label="Time"
                                persistent-hint
                                prepend-icon="event"
                                @blur="time = time"
                            ></v-text-field>
                            <v-time-picker color="black" v-model="time" @input="menu4 = false"></v-time-picker>
                            </v-menu>

                        </v-flex>

                        
                    </v-layout>


                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn 
                            :disabled="!formIsValid"
                            type="submit"
                            >Create Hangout</v-btn>
                        </v-flex>                        
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: vm => ({
      today: new Date().toISOString().substr(0, 10) + 1,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      time: new Date(),
      image: null,
    }),

    computed: {
    formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
        onCreateHangout () {
        if (!this.formIsValid) {
        return
        }    
        if (!this.image){
            return
        }
            const hangoutData ={
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                date: this.dateFormatted,
                time: this.time,
                

            }
            this.$store.dispatch('createHangout', hangoutData)
            this.$router.push('/')
        }, 
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      onPickFile() {
          this.$refs.fileInput.click()
      },
      onFilePicked (event){
          const files = event.target.files
          let filename = files[0].name
          if (filename.lastIndexOf ('.') <= 0) {
              return alert('Please add a valid file!')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener ('load', () => {
              this.imageUrl = fileReader.result
          })
          fileReader.readAsDataURL(files[0])
          this.image = files[0]
      }
    },
    
    }
</script>

<style>

</style>
