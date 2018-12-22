<template>
<v-container >
  <form @submit.prevent="onCreateHangout">
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
<!-- mobile -->
<v-layout row hidden-sm-and-up>
    <v-flex xs12 sm6 offset-sm3>
        <img :src="imageUrl" height="200"> 
    </v-flex>
</v-layout>
<v-btn color="success" type="submit">text</v-btn>
  </form>
</v-container>
</template>

<script>
export default {
  data: vm => ({
    
    imageUrl: null
  }),

  methods: {
  onCreateHangout () {
    if (!this.image){
        return
    }
        const hangoutData ={
          image: this.image,
    }
        this.$store.dispatch('createHangout2', hangoutData)
        this.$router.push('/')
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
