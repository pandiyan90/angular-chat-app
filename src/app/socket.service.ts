import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor() {
    this.socket = io('https://dev.membervw.hlth360.net:11008', {
      path: '/cm/socket',
      transports: ['websocket']
    });
  }

  setup() {

    //this.socket.nsp = '/';
    //this.socket.emit('join_chat', {'userId' : 'c04a5470-017d-4ffb-9e12-1bed3058e657', 'userRole': 'PATIENT'});

    console.log(this.socket.id);
    console.log(this.socket.connected);

    setTimeout(() => {
      this.socket.emit('patient_join', {'userId' : 'c04a5470-017d-4ffb-9e12-1bed3058e657'});

      this.socket.on('patient_join_response', (msg: any) => {
        console.log(new Date()+': user join chat res: '+ JSON.stringify(msg));
      });
    }, 5000);

    setTimeout(() => {
      this.socket.emit('patient_contacts', {'userId' : 'c04a5470-017d-4ffb-9e12-1bed3058e657'});

      this.socket.on('patient_contacts_response', (msg: any) => {
        console.log(new Date()+': user contact res: '+ JSON.stringify(msg));
      });

    }, 10000);

    setTimeout(() => {
      this.socket.emit('patient_chat_room', {'userId' : 'c04a5470-017d-4ffb-9e12-1bed3058e657', 'staffId': 'b8fdb8f5-96d1-4ebb-828b-1761705cef80'});

      this.socket.on('patient_chat_room_response', (msg: any) => {
        console.log(new Date()+': user chat room res: '+ JSON.stringify(msg));
      });
    }, 15000);

    setInterval(() => {
      this.socket.emit('patient_send_message', {
        "patientId" : "c04a5470-017d-4ffb-9e12-1bed3058e657",
        "staffId" : "b8fdb8f5-96d1-4ebb-828b-1761705cef80",
        "sender": "c04a5470-017d-4ffb-9e12-1bed3058e657",
        "senderRole": "Patient",
        "receiver": "b8fdb8f5-96d1-4ebb-828b-1761705cef80",
        "receiverRole": "Case-Manager",
        "text": new Date()
      });
      console.log('msg sent');
      
    }, 30000);

    this.socket.on('patient_send_message_response', (msg: any) => {
      //console.log('message_resp_event: '+ JSON.stringify(msg));
    });

    this.socket.on('patient_receive_message', (msg: any) => {
      console.log('user receive msg: '+ JSON.stringify(msg));
    });

    this.socket.on('patient_own_message', (msg: any) => {
      console.log('own_message_event: '+ JSON.stringify(msg));
    });

    this.socket.on('disconnect', () => {
      this.setup();
    });
  }

}
