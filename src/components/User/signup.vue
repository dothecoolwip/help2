<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"> </app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    error
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required>
                      </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      :append-icon="show4 ? 'visibility_off' : 'visibility'"
                      error
                      name="password"
                      label="Password"
                      hint="At least 6 characters"
                      id="password"
                      v-model="password"
                      :type="show4 ? 'text' : 'password'"
                      @click:append="show4 = !show4"                      
                      required>
                      </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      :append-icon="show4 ? 'visibility_off' : 'visibility'"
                      error
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      :type="show4 ? 'text' : 'password'"
                      :rules="[comparePasswords]"
                      @click:append="show4 = !show4"
                      >
                      </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit"
                    :disabled="loading"
                    :loading="loading">
                      Sign up
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                   <v-flex xs12>
                    <v-btn color="success" ma-3
                    
                    to="/signin"
                    >Have An Account? Sign In
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon></span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data ( ){
        return {
            email: '',
            password: '',
            confirmPassword: '',
            show4: false,
        }

    },
    computed: {
        comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        user () {
            return this.$store.getters.user
        },
        error () {
          return this.$store.getters.error
        },
        loading () {
          return this.$store.getters.loading
        }
    },
    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignup () {
          if (this.password == this.confirmPassword)
            this.$store.dispatch('signUserUp', {email: this.email, password: this.password})

            
        },
        onDismissed () {
          console.log('Dismess ALert!')
          this.$store.dispatch('clearError')
        }
    }

}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
