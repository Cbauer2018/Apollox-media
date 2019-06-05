<template>
  <div id="app">
    <template>
    
  <v-container bg fill-height grid-list-md text-xs-left>
           <img src="@/assets/astronautlogo.jpg" height="250">
          <img src="@/assets/apolloLetters.jpg" height="250">
      </v-container>

 <v-toolbar 
 class = "primary">
   
   <v-toolbar-items class="hidden-xs-only">
     <v-btn  color="cyan" flat v-for="item in menuItems"
      :key="item.title"
      router
      :to="item.Link">
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
   <input  type="search" placeholder="search...">
    <v-btn
     v-if="userIsAuthenticated"
     flat
     @click="onLogout"
     router
     :to="'/'">
     <v-icon left dark>exit_to_app</v-icon>
     </v-btn>
   
 </v-toolbar>
  <main>
    <router-view></router-view>
  </main>
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
          window.location.href = "https://youtu.be/oHg5SJYRHA0"
      }
      
    },
    watch:{

    }
}

</script>
