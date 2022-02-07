<template>
    <div id="nav">
        <router-link to="/" active-class="active">Home</router-link>
        <router-link to="/about" active-class="active">About</router-link>
        <router-link to="/crypto" active-class="active">Smart Contract</router-link>
    </div>
    <!-- {{ props.loading }} -->
    <Loader v-if="props.loading == true" />
    <router-view />
</template>

<script>
import { useCryptoStore } from "@/store/crypto";
import Loader from "@/components/Loader.vue";
export default {
    name: "App",
    setup() {
        const props = useCryptoStore();
        return {props}
    },
    components: { Loader },
};
</script>

<style lang="scss">
.active {
    background: rgb(119, 119, 119);
    color: white;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#nav {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    min-width: 150px;
    width: max-content;
    margin: 1rem auto;
    background: rgb(233, 233, 233);
    border-radius: 10px;
    a {
        padding: 1rem 2rem;
        &:hover {
            background: rgb(218, 218, 218);
            color: gray;
        }
    }
}
</style>
