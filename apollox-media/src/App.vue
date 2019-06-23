<template>
  <div id="app">
    <template>
    
  <v-container bg fill-height grid-list-md text-xs-left>
           <img src="@/assets/astronautlogo.jpg" height="250">
          <img src="@/assets/apolloLetters.jpg" height="250">
      </v-container>

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


export default {
  data () {
      return {
       
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
          window.open("https://youtu.be/oHg5SJYRHA0")
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
footer {
 position: fixed;
 bottom: 0;
 width: 100%;
 height: 10;
}
</style>
