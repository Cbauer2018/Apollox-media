  <template>
    <container>
      <v-flex xs4 offset-sm4 my-5 v-if="!userIsAuthenticated">
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
      <v-layout my-5 row wrap>
        <v-flex xs1>
          <v-card></v-card>
        </v-flex>
        
        <v-flex sm6 md3>
          <v-card flat>
            <v-layout column>
              <v-flex ml-4 >
              <v-avatar v-for="profile in profile"
                :key="profile"
                :tile="tile"
                :size="140"
                color="grey lighten-4">
                <img 
                v-if="hasProfilePic" 
                :src="profile.imageUrl" alt="avatar">
                <img v-else src="@/assets/astronautlogo.jpg">
              </v-avatar>
              </v-flex>
              <v-flex>
                <v-layout row>
                <v-rating 
                  v-model="rating"
                  hover
                  color = "cyan lighten-1"
                  background-color="cyan lighten-1"
                  readonly
                  half-increments>      
                </v-rating>
                <v-flex my-3 ml-1>
                <span>
                  16.7k
                </span>
                </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        
        
        <v-flex xs8 sm5>
          <v-card flat>
            <v-flex
                v-for="profile in profile" 
                :key="profile">
                  <h2 class = "display-1 font-weight-thin">
                    {{  profile.username }} </h2>
          <v-flex my-2>
              <span>
                {{ profile.bio }}
              </span>
          </v-flex>
          </v-flex>
          </v-card>
        </v-flex>
        
        <v-flex xs6 sm3>
          <v-card flat>
            <v-layout column wrap>
              <v-flex ml-3>
                  <h2 class = "font-weight-thin">Followers 0</h2>
              </v-flex>
              <v-flex ml-3 my-2>
                  <h2 class = "font-weight-thin">Following 0</h2>
              </v-flex>
                  <v-layout v-show="!userIdMatch">
                    <v-flex ml-2>
                    <v-btn 
                        @click=" changeBtn"
                        outline color="cyan lighten-2">
                        {{followArray[this.numberI].word}}
                <v-icon>
                    {{followIconArray[this.numberI].icon}}
                </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-layout>

        <v-layout
            v-show="userIdMatch">
        <v-flex ml-5>
            <v-btn 
                  router
                  :to="'/Profile/Edit'"
                  fab small
                  outline color="cyan lighten-2">
              <v-icon>
                settings
              </v-icon>
            </v-btn>
            </v-flex>
          </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs1>
          <v-card flat></v-card>
        </v-flex>
      </v-layout>
      </v-flex>
      

      
        <container>
          <v-layout row>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          <v-flex xs8>
          <v-card class = "pa-2">
              <v-layout row>
                    <v-flex my-2 xs11>
                        <div class= "title font-weight-thin">Posts</div>
                    </v-flex>
                    <v-flex my-2 xs1>
                        <div class= "title font-weight-thin">Date</div>
                    </v-flex>
              </v-layout>
          </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          </v-layout>

        <v-layout row wrap>
              <v-flex xs2>
                <v-card></v-card>
              </v-flex>
                    <v-flex xs8>
                      <v-card
                          v-for="post in loadProfilePosts" 
                          :key="post">
                          <v-flex xs12>
                            <v-card flat>
                          <v-layout row>
                            <v-flex ma-2>
                              <v-layout column>
                        <v-avatar
                            :size="75"
                            color="grey lighten-4">
                            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                        </v-avatar>
                        <h4 class = "font-weight-thin">
                          {{post.username}} </h4>
                            </v-layout>
                        </v-flex>
                        <v-layout column>
                          <v-flex my-2 ml-5>
                          <h1 class = "font-weight-thin">{{post.title}}</h1>
                            <span>
                                {{post.newReview}}
                            </span>                            
                            <v-flex>
                             <v-flex xs12>
                           <v-list>
          <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile color="green">
                <v-list-tile-content >
                  <v-list-tile-title >What is Correct</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile >
              <v-list-tile-content
              v-for="text in post.rightList"
              :key="text.text"
             
              >
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>


           <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile  color="red">
                <v-list-tile-content>
                  <v-list-tile-title>What is Incorrect</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            >
              <v-list-tile-content
              v-for="text in post.wrongList"
              :key="text.text">
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

  <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile color="yellow darken-3">
                <v-list-tile-content>
                  <v-list-tile-title>Important Facts that were not included</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            >
              <v-list-tile-content
              v-for="text in post.notIncludedList"
              :key="text.text">
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          
        </v-list>
                      </v-flex>

                            <v-layout row>
                              <v-flex xs6 my-3>
                                <v-rating
                                v-model="rating"
                                hover
                                color = "cyan lighten-1"
                                background-color="cyan lighten-1"
                                readonly
                                half-increments></v-rating>
                              </v-flex>
                              <v-flex xs4>
                                <V-text-field
                                placeholder="Comment..."></V-text-field>
                                </v-flex>
                                <v-flex xs2>
                                  <v-btn>
                                    <v-icon>mail</v-icon>
                                  </v-btn>
                                </v-flex>
                            </v-layout>
                            </v-flex>
                            </v-flex>
                          </v-layout>
                          
                          <v-card flat>
                          <v-flex my-2>
                            <h2 class="font-weight-thin">11/15/2001</h2>
                          </v-flex>
                          </v-card>
                          
                        </v-layout>
                        </v-card>
                        </v-flex>
                      </v-card>
                      
                    </v-flex>
                    <v-flex xs2>
                        <v-card></v-card>
                      </v-flex>
          </v-layout>

        </container>
    </container>
  </template>

<script>
import Popup from './profilePopup'

export default{
  component: { Popup },
   props: ['id'],

  
  data(){
    return{
      items: [
        {
          id: 1,
          name: 'What Facts were Correct:',
          children: [
           
          ]
        }
      ],
     

      rating: 3.3,
      followArray: [{word: "Follow"}, {word: "Following"}],
      followIconArray: [{icon: "add"}, {icon: ""}],
      popUpUnfollow: [],
      numberI: 0

    }
  },

   computed: {

    userIdMatch () {
      return this.$store.getters.userId === this.$store.getters.loadedProfileId
    },
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      profile(){
        return this.$store.getters.loadedProfile;
      },
      hasProfilePic(){
       
      
      let profile = this.profile
      console.log(profile[0].imageUrl)


         if(profile[0].imageUrl!= null){
           
           return true
         }else{
           return false
         }
       },

        loadProfilePosts(){
         return this.$store.getters.loadedProfilePosts
    },

      
      
    },
   
    

    methods:{
    
      changeBtn () {
         if (this.numberI==0){
          this.numberI=1
        }
        else{
          this.numberI=0
        }
      },

      changeDate (timeStamp) {
        var time = -timeStamp
        var d = new Date(time)
        console.log(d)
        return d
      },
       
    }


}
</script>