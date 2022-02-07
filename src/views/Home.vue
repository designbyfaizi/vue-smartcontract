<template>
    <div class="jokeSection flex flex-col justify-center items-center">
        <img src="@/assets/metamask.svg" alt="Metamask" class="metamask">
        <div class="jokeContainer">
            <div class="name">
                <h3>{{name}}</h3>
            </div>
            <div class="counter">
                <h1>
                    {{counter}}
                </h1>
            </div>
            <!-- <div class="counter-squared">
                {{counter}}
                <sup>2</sup> = {{doubleCount}}
            </div> -->
            <div class="buttons">
                <button @click="decrement" class="bg-gray-300 hover:bg-gray-400">-</button>
                <button @click="increment" class="bg-gray-200 hover:bg-gray-400">+</button>
            </div>
            <div @click="reset" class="resetButton bg-red-400 rounded-lg cursor-pointer w-min p-4 m-4 mx-auto hover:bg-red-500">RESET</div>
            <div>
                <input placeholder="Enter Color Code" type="text">
            </div>
        </div>
    </div>
</template>

<script setup>
//Destructured values lose reactivity, so we have to use storeToRefs
import { storeToRefs } from 'pinia';
import {useCounterStore} from '@/store/counter';

const main = useCounterStore();

const {counter, name} = storeToRefs(main);


const {increment, decrement, reset} = main;
// const {increment} = mapActions(useCounterStore, ["increment"])
// const {decrement} = mapActions(useCounterStore, ["decrement"])

main.$subscribe((mutation, state) => {
    console.log('Mutation', mutation);
    console.log('State', state);
});
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
