<script>
import { onDestroy, onMount } from "svelte";
import { getCookie } from "../utils/cookie";
import { connect, act, subscribe, sendMessage, disconnect } from '../service/stompService.js';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let chattings = [];
    let memberId = '';
    let ws;
    let newMessage = '';
    let message = {
        userId: '',
        content: ''
    };
    const roomId = 234;
    let socket;
    let client;

onMount( () => {
    connect();
    act()
 })
    const handleSendMessage = () => sendMessage('/app/sendMessage', newMessage)
</script>

<div>
    <input bind:value={newMessage} placeholder="Type a message" />
    <button on:click={handleSendMessage}>Send</button>
</div>
