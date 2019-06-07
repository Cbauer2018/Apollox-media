<template>
    <v-container>
   <h1 v-for="username in searchedUsernames" :key="username">{{username.username}}</h1>
   <h1 v-for="post in searchedPosts" :key="post">{{post.title}}</h1>
    </v-container>
</template>

<script>


export default {
  data () {
      return {
        
      }
    },
methods: {
   
},
beforeCreate() {
    this.$store.dispatch('searchWord', {keyword: this.$route.params.keyword})
},

computed: {
    searchedPosts(){
      
        return this.$store.getters.loadedSearchedPosts;
      
      },
      searchedUsernames(){
          return this.$store.getters.loadedSearchedUsernames;
      }
      
    
},

}


</script>
