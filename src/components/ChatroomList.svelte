<script>
    import ChatroomPreview from "./ChatroomPreview.svelte";
    import { getApi, putApi, delApi, postApi } from "../service/api.js";
    import { onDestroy, onMount } from "svelte";
    import { getCookie } from "../utils/cookie";
    import { connect, subscribe, sendMessage, disconnect } from '../service/stompService.js';

    let chattings = [];
    let memberId = '';
    let ws;
    let newMessage = '';
    let message = {
        userId: '',
        content: ''
    };

       // 연결 함수
   function onConnected() {
      console.log('Connected to STOMP');
      subscribe('/topic/greetings', onMessageReceived);
   }

   // 오류 처리 함수
   function onError(error) {
      console.error('Could not connect to STOMP:', error);
   }

      // 메시지 수신 처리 함수
      function onMessageReceived(message) {
      const receivedMessage = JSON.parse(message.body);
      console.log('Received:', receivedMessage);
   }


    onMount(() => {
        connect(onConnected, onError);
        subscribe('topic/preview', (message) => {
            console.log(message)
            let newChatting = message // 뭔가 파싱..
            chattings = [...chattings, newChatting]
        })
    });

    onDestroy(() => {
        disconnect();
    });
 
    const handleSendMessage = () => {
        message.content = newMessage;
        sendMessage('/app/sendMessage', message);
    }
</script>

<div class="slog-list-wrap">
    {#if chattings.length > 0}
        {#each chattings as chat (chat.id)}
            <ul class="slog-ul">
                <li class="mb-5">
                    <ChatroomPreview {chat} />
                </li>
            </ul>
        {/each}
    {:else}
        <p>No Chatting found</p>
    {/if}
</div>

<div>
    <input bind:value={newMessage} placeholder="Type a message" />
    <button on:click={handleSendMessage}>Send</button>
</div>
