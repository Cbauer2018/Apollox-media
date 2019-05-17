<template>
 <div id="add-blog">
     <h2> Add a New Blog Post</h2>
    <form>
        <label>Blog Title:</label>
        <input type="text" required/>
        <label>Blog Content</label>
        <textarea></textarea>
    </form>

    <div id="preview">
        <h3>Preview Blog</h3>
        <p>Blog Title:</p>
        <p>Blog Content:</p>

    </div>
 </div>
</template>

<script>


export default {
  name:'addPost',
  components:{
   
    
  },

  data () {
      return {
      }
    },
    methods:{
      
    }
 
}
</script>
