<template>
  <div class="app">
    <h1>Our Todos</h1>
    <router-link to="/new"><button>New Todo</button></router-link>
    <router-view :posts="posts" :url="url" :getPosts="getPosts" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue"; // Import Composition API Hooks
// ref hook allows use to create reactive variables
// onMounted let's us execute code when component mounts

export default {
  name: "App",
  // Setup property allows us to use new composition api to define properties/methods
  // Returns an object with any properties/methods the component should have
  setup(props) {
    // variable with base url for API calls
    const url = "https://api.herokuapp.com/todos/";
    // ref for holding all the posts
    const posts = ref([]);
    // method for getting posts
    const getPosts = async () => {
      const response = await fetch(url);
      const data = await response.json();
      posts.value = await data;
    };
    //run getPosts once when component loads
    onMounted(() => getPosts());
    // return component properties and methods
    return {
      posts,
      getPosts,
      url,
      ...props,
    };
  },
};
</script>

<style>
.app {
  text-align: center;
}
</style>