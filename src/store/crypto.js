import { ref } from 'vue';
import {ethers} from 'ethers';
// import { acceptHMRUpdate } from 'pinia';
import { defineStore } from 'pinia';
import contractABI from '../artifacts/contracts/WavePortal.sol/WavePortal.json';
const contractAddress = '0xceC882c75b6E97c8E7bD86d3B310bA6A117bF736'

export const useCryptoStore = defineStore('user', () => {
    const account = ref(null);
    const guestPosts = ref([]);
    const loading = ref(false);
    const guestPostsCount = ref(0);

    async function getBalance(){
        try{
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
                const count = (await wavePortalContract.getBalance());
                //Formatting Ethers
                const amt = ethers.utils.formatEther(count);
                console.log('count 1: ', amt)
                setLoader(false)
            }
        }
        catch(err){
            setLoader(false);
            console.log(err)
        }
    }

    async function wave(messageInput){
        console.log("Setting Loader");
        setLoader(true);
        try{
            console.log(`got ${messageInput}`);
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
                wavePortalContract.on('PrizeMoneySent', (receiver, amount) =>{
                    console.log(`Prize Won!🙌 ${amount} Received! Receiver: ${receiver}`)
                });
                const overrides = {
                    value: ethers.utils.parseEther('.05'),
                    gasLimit: 2000000,

                }

                // Execute the actual wave from your smart contract
                const waveTxn = await wavePortalContract.wave(messageInput, overrides);
                console.log("Mining...⛏", waveTxn.hash);
                await waveTxn.wait();
                console.log("Mined. 💯", waveTxn.hash);

                const count = (await wavePortalContract.totalWaveCount());
                console.log('count 2: ', count);
                messageInput = '';
                setLoader(false)
            }
            else{
                setLoader(false);
                console.log('Ethereum object doesn\'t exist!');
            }
        }
        catch(err){
            setLoader(false);
            console.log(err);
        }
    }

    async function getAllWaves(){
        try{
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

                const waves = await wavePortalContract.getAllWaves();

                //We only need address, timestamp and message
                const wavesCleaned = [];
                waves.forEach(wave => {
                    const waveTime = new Date(wave.timestamp*1000);
                    const waveTimeFormatted = new Intl.DateTimeFormat('en-US').format(waveTime);
                    wavesCleaned.push({
                        address: wave.waver,
                        timestamp: waveTimeFormatted,
                        message: wave.message,
                    })
                });

                guestPosts.value = wavesCleaned;

                wavePortalContract.on('NewWave', (from, message, timestamp) => {
                    console.log("NewWave", from, message, timestamp);
                    const waveTime = new Date(timestamp * 1000);
                    const waveTimeFormatted = new Intl.DateTimeFormat('en-US').format(waveTime);
                    guestPosts.value = [...guestPosts.value, {
                        address: from,
                        timestamp: waveTimeFormatted,
                        message,

                    }]
                })
                console.log("GUEESSTTPOSTSSSS: ", guestPosts.value)
            }
            else{
                setLoader(false);
                console.log("Ethereum object doesn't exist!")
            }
            setLoader(false)
        }
        catch(err){
            setLoader(false)
            console.log(err)
        }
    }

    async function getWaveCount(){
        try{
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
                const count = (await wavePortalContract.totalWaveCount());
                console.log('Retrieved total wave count ... ', count);
                guestPostsCount.value = count
                setLoader(false)
            }
            else{
                setLoader(false)
                console.log("Ethereum object doesn't exist!")
            }
        }
        catch(err){
            setLoader(false)
            console.log(err)
        }
    }
    async function connectWallet(){
        try{
            setLoader(true);
            const {ethereum} = window;
            if(!ethereum){
                alert('Must connect to Metamask!');
                return;
            }
            const myAccounts = await ethereum.request({method:'eth_requestAccounts'});
            console.log('Connected: ', myAccounts[0]);
            account.value = myAccounts[0];
            await getWaveCount();
            await getAllWaves();
            await getBalance();
        }
        catch(err){
            setLoader(false);
            console.log(err);
        }
    }

    function setLoader(value){
        console.log('setloader ', value);
        loading.value = value;
    }

    return{
        setLoader,
        loading,
        wave, 
        connectWallet,
        account,
        guestPosts,
        guestPostsCount
    }
});

// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))