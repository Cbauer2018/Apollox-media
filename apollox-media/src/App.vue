<template>
  <div id="app">

 <div  v-show="!userIsAuthenticated" class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="1000"
    
    >
      

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
        Welcome to ApolloX Media!
        </v-card-title>
<img src="@/assets/astronautlogo.jpg" alt="ApolloX Media Astronaut" height="100">
<v-card-text > <h2>ApolloX Media is a news platform that is aimed at providing people with an unbiased news community they can trust. The platform promotes highlighting biases and facting checking of various modes of media such as: Articles, Videos, Speeches, Debates and many more!</h2></v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn
            color="primary"
            flat
            @click="dialog = false"
             router
      :to="'/Login'"
          >
           LOGIN
          </v-btn>
           <v-btn
            color="primary"
            flat
            @click="dialog = false"
             router
      :to="'/Signup'"
          >
           SIGNUP
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>



    <template>
    <div v-responsive.lg.xl >
  <v-container bg fill-height grid-list-md text-xs-left>
           <img src="@/assets/astronautlogo.jpg" height="250">
          <img src="@/assets/apolloLetters.jpg" alt="ApolloX Media"  height="250">
      </v-container>
    </div>
    <v-layout justify-center>

<div v-responsive ="['hidden-all','xs','sm', 'md']" >
   <img src="@/assets/astronautlogo.jpg" alt="ApolloX Media Astronaut"  height="250">
</div>
</v-layout>

 <div v-responsive ="['hidden-all','xs','sm', 'md']" >
   <v-toolbar dark>
     
 <v-container>
      <v-layout justify-center>
        <v-icon

          @click.stop="drawer = !drawer"
        >
         list
        </v-icon>
      </v-layout>
    </v-container>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    
    >
     <v-flex  v-if="item.title != 'Profile' "  v-for="item in menuItems" :key="item.title">
    <v-btn 
    color="cyan" flat
      router
      :to="item.Link">
       <v-icon left dark >{{item.icon}}</v-icon>
       {{item.title}}
     </v-btn>
     <v-divider></v-divider>
     </v-flex>
  
     <v-flex v-else-if="item.title == 'Profile'" 
      :key="item.title">
       <v-btn 
       color="cyan" flat 
      router
      :to="item.Link"
      @click="loadProfile">
       <v-icon left dark >{{item.icon}}</v-icon>
       {{item.title}}
       
     </v-btn>
     <v-divider></v-divider>
     </v-flex>
  
     <v-divider></v-divider>
    <v-btn  color="cyan" flat @click="goToStore"
      >
       <v-icon left dark>store</v-icon>
       Store
     </v-btn>
     
   <v-divider></v-divider>
   <v-icon color="black" >search</v-icon>
   <input v-model="searching" v-on:keyup.enter="searchWord" type="search" placeholder="search...">
   <v-divider></v-divider>
   <v-btn
     v-if="userIsAuthenticated"
     flat
     @click="onLogout"
     router
     :to="'/'">
     <v-icon left dark>exit_to_app</v-icon>
     Logout
     </v-btn>
    </v-navigation-drawer>
 </div>


 <div  v-responsive ="['hidden-all','lg', 'xl']">
 <v-toolbar 
  >
  
   <v-toolbar-items class="hidden-xs-only">
     <v-btn v-if="item.title != 'Profile' " color="cyan" flat v-for="item in menuItems"
      :key="item.title"
      router
      :to="item.Link">
       <v-icon left dark >{{item.icon}}</v-icon>
       {{item.title}}
     </v-btn>
       <v-btn v-else-if="item.title == 'Profile'" color="cyan" flat 
      :key="item.title"
      router
      :to="item.Link"
      @click="loadProfile">
       <v-icon left dark >{{item.icon}}</v-icon>
       {{item.title}}
     </v-btn>
  
     
    <v-btn  color="cyan" flat @click="goToStore"
      >
       <v-icon left dark>store</v-icon>
       Store
     </v-btn>
     
    
     
   </v-toolbar-items>
   <v-spacer></v-spacer>
   <v-icon color="black" >search</v-icon>
   <input v-model="searching" v-on:keyup.enter="searchWord" type="search" placeholder="search...">
   <v-btn
     v-if="userIsAuthenticated"
     flat
     @click="onLogout"
     router
     :to="'/'">
     <v-icon left dark>exit_to_app</v-icon>
     Logout
     </v-btn>
   
 </v-toolbar>
 </div>
  <main>
    <transition name="fade" mode="out-in" @before-enter="beforeEnter" appear>
  <router-view></router-view>
</transition>
  </main>
  <v-footer
    dark
    height="25"
  >
  <v-layout justify-center>
    <v-card
      flat
      tile
      
      class="black white--text "
    >
    
        &copy;2019 — <strong>ApolloX Media </strong>
        -
         <span @click="PrivacyPolicy" class="myClickableThingy">Privacy Policy</span>
         -
       <span @click="Terms" class="myClickableThingy">Terms Of Use</span>
       
 
    </v-card>
    </v-layout>
  </v-footer>
</template>
  </div>

</template>

<script>

import vueResponsive from 'vue-responsive'
  
export default {
  
  data () {
      return {
       drawer: null,
       dialog:true
      }
    },
  components:{
vueResponsive
  },
  beforeCreate(){
    if(this.$store.getters.user !== null && this.$store.getters.user !== undefined){
      dialog = true
    }else{
      dialog = false
    }
  },
  computed:{
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
       profileId(){
        return this.$store.getters.user
      },
      
    
    menuItems(){
      let menuItems =[
          {icon:'stars', title:'Promoted', Link:'/'},
          {icon:'done_outline', title:'Following',Link:'/Following'},
          {icon:'assessment', title:'Recent', Link:'/Recent', },
          {icon:'account_box', title:'Profile', Link:'/Profile/Login'},
          {icon:'add_box', title:'Post', Link:'/Post'},
          {icon:'input', title:'Login', Link:'/Login'},
          {icon:'play_for_work', title:'Signup', Link:'/Signup' },
        ]
      
        if(this.userIsAuthenticated ){
         menuItems =
          [
          {icon:'stars', title:'Promoted', Link:'/'},
          {icon:'done_outline', title:'Following',Link:'/Following'},
          {icon:'assessment', title:'Recent', Link:'/Recent'},
          {icon:'account_box', title:'Profile', Link:'/Profile/'+this.profileId.id},
          {icon:'add_box', title:'Post', Link:'/Post'},
          {icon:'class', title:'Contact Us', Link:'/Contact'}
         
        ]
        }
        return menuItems
    },
    
      
       

    },

    methods:{
      onLogout(){
        this.$store.dispatch('logout')
      },
      goToStore(){
          window.open("https://apolloxapparel.com")
      },
      searchWord(){
        this.$store.dispatch('searchWord', {keyword: this.searching})
        this.$router.push("/Search/" + this.searching)
        
      },
      loadProfile(){
        this.$store.dispatch('loadProfile', {uid:this.profileId.id})
         this.$store.dispatch('loadProfilePosts', {uid: this.profileId.id , index:2})
      },
      beforeEnter() {
        window.scrollTo(0,0);
      },
      PrivacyPolicy(){
        window.open("https://app.termly.io/document/privacy-policy/acab2786-f537-4216-bf94-e1d215ff4c16")
      },
       Terms(){
        window.open("https://app.termly.io/document/terms-of-use-for-website/296b1ad3-677c-4c63-8456-9c029b274b0c")
      }
     
      
    },
    watch:{

    }
}

</script>

<style>
.footer {
 position: fixed;
 bottom: 0;
 width: 100%;
 height: 10;
}



</style>
