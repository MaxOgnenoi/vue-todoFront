import AllPosts from "./pages/AllPosts.vue";
import SinglePost from "./pages/SinglePost.vue";
import TodoForm from "./pages/TodoForm.vue";
/////////////////////////
// Array of Routes
/////////////////////////
export default [
    { path: "/", component: AllPosts },
    { path: "/post/:id", component: SinglePost, name: "post" },
    { path: "/new", component: TodoForm },
    { path: "/edit/:id", component: TodoForm, name: "edit" }, // Use dynamic parameter
];
