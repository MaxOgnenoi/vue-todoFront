<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Subject" v-model="subject" />
        <input type="text" placeholder="Details" v-model="details" />
        <input type="submit" :value="buttonLabel" />
    </form>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, toRefs } from "vue";

export default {
    name: "TodoForm",
    props: ["posts", "url", "getPosts"],
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const { posts, url, getPosts } = toRefs(props);
        const subject = ref("");
        const details = ref("");
        let buttonLabel;
        let handleSubmit;

        if (route.name === "edit") {
            const post = posts.value.find((p) => p.id == route.params.id);
            if (post) {
                subject.value = post.subject;
                details.value = post.details;
            }
            buttonLabel = "Edit Todo";
            handleSubmit = async () => {
                if (post) {
                    await fetch(url.value + route.params.id + "/", {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            subject: subject.value,
                            details: details.value,
                        }),
                    });

                    getPosts.value();
                    router.push("/");
                }
            };
        } else {
            buttonLabel = "Create Todo";
            handleSubmit = async () => {
                await fetch(url.value, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        subject: subject.value,
                        details: details.value,
                    }),
                });

                getPosts.value();
                router.push("/");
            };
        }
        return {
            subject,
            details,
            handleSubmit,
            buttonLabel,
        };
    },
};
</script>
