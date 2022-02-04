<template>
    <div class="jokeSection flex flex-col justify-center items-center">
        <img src="@/assets/metamask.svg" alt="Metamask" class="metamask">
        <div class="jokeContainer">
            <div :style="{color: $store.state.colorCode}" class="counter">
                <h1>
                    {{ $store.state.counter }}
                </h1>
            </div>
            <div class="counter-squared">
                {{ $store.state.counter }}
                <sup>2</sup> = {{$store.getters.counterSquared}}
            </div>
            <div class="buttons">
                <button @click="$store.dispatch('decreaseCounter')" class="bg-gray-300 hover:bg-gray-400">-</button>
                <button @click="$store.dispatch('increaseCounter')" class="bg-gray-200 hover:bg-gray-400">+</button>
            </div>
            <div>
                <input v-model="colorCode" placeholder="Enter Color Code" type="text">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    computed:{
        colorCode:{
            get(){
                return this.$store.state.colorCode
            },
            set(newValue){
                this.$store.dispatch('setColorCode', newValue)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.metamask{
    max-width: 200px;
    margin: 1rem;
}
.jokeContainer {
    padding: 2rem;
    background: whitesmoke;
    min-width: 400px;
    width: max-content;
    height: fit-content;
    margin: 0 auto 0 auto;
    display: flex;
    flex-direction: column;
    h1,
    h2 {
        font-size: 60px;
        margin: 0;
        padding: 0;
    }
    button {
        font-size: 30px;
        width: max-content;
        margin: 0 auto;
        padding: 2rem 3rem;
    }
    input{
        margin: 1rem;
    }
}
</style>
