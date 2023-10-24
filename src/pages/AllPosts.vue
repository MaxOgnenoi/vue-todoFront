<template>
    <div>
        <div class="post" v-for="(post, index) in props.posts" :key="index">
            <router-link :to="{ name: 'post', params: { id: index } }">
                <h1>{{ post.subject }}</h1>
            </router-link>
            <h2>{{ post.details }}</h2>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "AllPost",
};
</script>
  
<style>
.post {
    text-align: center;
    border: 3px solid green;
    margin: 10px auto;
    width: 80%;
}
</style>