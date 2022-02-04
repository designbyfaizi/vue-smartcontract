<script setup>
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useCryptoStore} from '@/store/crypto';

const messageInput = ref(null);
const cryptoStore = useCryptoStore();
const {wave, connectWallet} = useCryptoStore();
const {account, guestPosts, guestPostsCount} = storeToRefs(cryptoStore)
console.log(guestPosts)
</script>


<template>
    <div class="">
        <h1 class="text-blue-400 text-3xl">
            Faizan's Crypto Guest Book
        </h1>
        <button v-if="!account" class="bg-green-500 py-4 px-3 rounded-lg text-white m-5 hover:bg-green-600" @click="connectWallet">Connect Wallet</button>
        <div v-if="account">
            <input v-model="messageInput" name="guestBookInfo" maxlength="45" type="text" class="bg-gray-100 py-4 px-3 rounded-lg outline-none" placeholder="Enter your message!">
            <button @click="wave(messageInput)" class="bg-green-500 py-4 px-3 rounded-lg text-white m-5 hover:bg-green-600">Send</button>
        </div>
        <div v-if="account" class="bg-gray-100 p-4">
            <h3 class="text-4xl py-4">
                Number of Entries {{guestPostsCount}}
            </h3>
            <div v-for="(guestPost, idx) in guestPosts" :key="idx" class=" mx-auto w-3/12 p-2 rounded-lg">
                <div v-if="guestPost.message" class="w-full flex justify-between bg-gray-300 p-2 rounded-lg">
                    <span>{{guestPost.timestamp}}</span>
                    <span>{{guestPost.message}}</span>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>

</style>