<template>
<v-container>
   <v-flex xs12 sm6 offset-sm3  v-if="!userIsAuthenticated">
  <v-card>
          <v-card-text>
            <v-container>
              <v-layout justify-center>
                  <h2 class="display-1 font-weight-thin">
                     Login or Signup to View Profile
                  </h2>
              </v-layout>
              <v-flex>
     <v-layout mt-5 justify-center>
     <v-btn 
     router
     :to="'/Login'"
     outline large round color="cyan lighten-2">
        Login
     </v-btn>
     <v-btn
     router
     :to="'/Signup'" 
     outline large round color="cyan lighten-2">
        SignUp
     </v-btn>
   </v-layout>
   </v-flex>
            </v-container>
          </v-card-text>
        </v-card>
  </v-flex>

  <v-flex v-if="userIsAuthenticated">
    <header>
        <v-layout align-start justify-start row column>
            <v-layout my-3 row>
                <v-flex xs4 ml-4>
        <v-avatar
          :tile="tile"
          :size="140"
          color="grey lighten-4"
        >
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
    </v-flex>
            <v-layout row>
      <v-flex xs6 ml-5 
      v-for="profile in profile" 
      :key="profile"
      >
      <h2 class = "display-1 font-weight-thin">
          {{  profile.username }}
        </h2>
        
        <v-flex ml-4 my-3>
        <span>
          Bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus consequuntur natus enim ipsum, voluptatibus adipisci, quisquam eveniet eligendi aut recusandae nesciunt? Eaque autem amet harum? Explicabo laboriosam iste amet cumque.
        </span>
        </v-flex>
        </v-flex>
        <v-layout align-end justify-start column>
        <v-flex mr-3 xs2 my-2>
        <h2 class = "font-weight-thin">Followers: 0</h2>
        </v-flex>
        
        
        <v-flex mr-3 my-2>
        <h2 class = "font-weight-thin">Following: 0</h2>
        </v-flex>
        <v-layout>
          <v-btn @click=" changeBtn"
        
          outline color="cyan lighten-2">
            {{followArray[this.numberI].word}}
            <v-icon>
              {{followIconArray[this.numberI].icon}}
            </v-icon>
            
          </v-btn>
        </v-layout>
        </v-layout>
        </v-layout>
          
            </v-layout>
            <v-layout row>
         <div class="text-xs-left">
    <v-rating v-model="rating"
              hover
              color = "blue"
              background-color="blue darken-4"
              readonly
              value="0"
    ></v-rating>
    <v-layout justify-end>
        <span> 
        16.7k
        </span>
        </v-layout>
        </div>
        </v-layout>
        </v-layout>

    </header>
    <v-card flat class = "pa-2">
      <v-layout row wrap>
      <v-flex my-5 xs10>
        <div class= "title font-weight-thin">Posts</div>
      </v-flex>
      <v-flex my-5 xs2>
        <div class= "title font-weight-thin">Date Created</div>
      </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
   
</v-container>


</template>

<script>
import Popup from './profilePopup'

export default{
  component: { Popup },
   props: ['id'],
  data(){
    return{

      rating: 4,
      followArray: [{word: "Follow"}, {word: "Following"}],
      followIconArray: [{icon: "add"}, {icon: ""}],
      popUpUnfollow: [],
      numberI: 0

    }
  },

   computed: {
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      profile(){
        return this.$store.getters.loadedProfile;
      }
    },

    methods:{
    
      changeBtn () {
         if (this.numberI==0){
          this.numberI=1
        }
        else{
          this.numberI=0
        }
      }
    }


}
</script>