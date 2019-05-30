<template>
    <v-container>
    <v-flex v-for="Post in recentPosts" :key="Post"><h1>{{Post.rightList}}</h1></v-flex>

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

computed: {
    recentPosts(){
        return this.$store.getters.loadedPromotedPosts;
      
      },
      
    
},

}

</script>

