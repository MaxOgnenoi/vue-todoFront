<template>
    <div class="post">
        <h1>{{ post.subject }}</h1>
        <h2>{{ post.details }}</h2>
        <router-link to="/"><button>Back to Main</button></router-link>
        <router-link :to="{ name: 'edit', params: { id: post.id } }"><button>Edit Todo</button></router-link>
        <button v-on:click="deletePost">Delete Todo</button>
    </div>
</template>
  
<script>
// get useRoute hook to get access to params
import { useRoute, useRouter } from "vue-router";
// getting toRefs hook to maintain props reactivity
import { toRefs } from "vue";

export default {
    name: "SinglePost",
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const { posts, url, getPosts } = toRefs(props);
        const post = posts.value[route.params.id];

        const deletePost = async () => {
            await fetch(url.value + post.id + "/", {
                method: "delete",
            });

            await getPosts.value();

            router.push("/");
        };

        return {
            post,
            deletePost,
        };
    },
};
</script>
  
<style>
button {
    margin: 10px;
}
</style>