import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient;
let connectedCallback = () => { };
let errorCallback = () => { };

export function connect() {

   const socket = new SockJS('http://127.0.0.1:8080/ws');
   stompClient = Stomp.over(() => socket);
   console.log('over..!')
   stompClient.connect({}, () => {

      console.log('Connected: ');
      stompClient.subscribe('/topic/chat/234', (message) => {
         console.log('?????' + message.body);
         console.log('?????message' + message);
      })
   })

   //  stompClient.onConnect = () => {
   //    console.log('Connected: ' );
   //    stompClient.subscribe('/topic/chat/234', (message) => {
   //       console.log('ㅁㅁㅁ' + message);
   //    })
   // }

   //    stompClient.connect({}, function () {
   //       console.log('Connected: ' );
   //       stompClient.subscribe('/topic/chat/234', function (message) {
   //           console.log('ㅁㅁㅁ' + message.body);
   //       });
   //   }, onError);
}

export function act() {
   stompClient.activate()
   console.log('activate: ' + stompClient.active);
}

export function subscribe(destination, callback) {
   if (stompClient) {
      stompClient.subscribe(destination, callback);
   } else {
      console.error('STOMP client is not connected.');
   }
}

export function sendMessage(destination, message) {
   if (stompClient) {
      console.log('accca')
      stompClient.send(destination, {}, JSON.stringify(message));
   } else {
      console.error('STOMP client is not connected.');
   }
}

export function disconnect() {
   if (stompClient) {
      stompClient.disconnect(() => {
         console.log('Disconnected from STOMP');
      });
   }
}
