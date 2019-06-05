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
        return this.$store.getters.loadedRecentPosts;
      
      },
      
    
},

}



</script>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-7289362809792138",
    enable_page_level_ads: true
  });
</script>