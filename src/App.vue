<template>
  <v-app>

    <v-toolbar >
      <v-toolbar-side-icon @click.stop= "sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Hikers Hangout</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">

        <v-btn  
        flat v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-icon>{{item.icon}}</v-icon>
          {{item.title}}
          </v-btn>
          <v-btn flat
          v-if="userIsAuthenticated"
          @click="onLogout"
          to="/">
            <v-icon dark>exit_to_app</v-icon>
            Logout
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer absolute="" temporary v-model="sideNav" class="hidden-sm-and-up">
      <v-list>
        <v-list-tile router to="/" >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Home
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile 
        v-if="userIsAuthenticated"
        @click="onLogout"
        to="/">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
   <main>
     <router-view></router-view>
   </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
   
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'how_to_reg', title: 'Sign Up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign In', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems= [{icon: 'directions_walk', title: 'View Hangouts', link: '/meetups'},
        {icon: 'room', title: 'Organize Hangouts', link: '/meetup/new'},
        {icon: 'person', title: 'Profile', link: '/profile'},
        ]
      }
      return menuItems

    },
         userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined  }
  },
  methods: {
    onLogout (){
      this.$store.dispatch('logout')
    }
  }
}
</script>

