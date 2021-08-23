import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor() {
    this.socket = io('http://REDISPOC-762927624.us-east-1.elb.amazonaws.com', {
      path: '/cm/socket',
      transports: ['websocket']
    });
  }

  setup() {

    //this.socket.nsp = '/';
    //this.socket.emit('join_chat', {'userId' : '422719f2-7fe8-4352-a8d1-b076383398f1', 'userRole': 'PATIENT'});

    console.log(this.socket.id);
    console.log(this.socket.connected);

    setTimeout(() => {
      this.socket.emit('patient_join', {'userId' : '422719f2-7fe8-4352-a8d1-b076383398f1'});

      this.socket.on('patient_join_response', (msg: any) => {
        console.log(new Date()+': user join chat res: '+ JSON.stringify(msg));
      });
    }, 5000);

    setTimeout(() => {
      this.socket.emit('patient_contacts', {'userId' : '422719f2-7fe8-4352-a8d1-b076383398f1'});

      this.socket.on('patient_contacts_response', (msg: any) => {
        console.log(new Date()+': user contact res: '+ JSON.stringify(msg));
      });

    }, 10000);

    setTimeout(() => {
      this.socket.emit('patient_chat_room', {'userId' : '422719f2-7fe8-4352-a8d1-b076383398f1', 'staffId': '1575e21b-4869-4647-bcf0-ce1adf274673'});

      this.socket.on('patient_chat_room_response', (msg: any) => {
        console.log(new Date()+': user chat room res: '+ JSON.stringify(msg));
      });
    }, 15000);

    setInterval(() => {
      this.socket.emit('patient_send_message', {
        "patientId" : "422719f2-7fe8-4352-a8d1-b076383398f1",
        "staffId" : "1575e21b-4869-4647-bcf0-ce1adf274673",
        "sender": "422719f2-7fe8-4352-a8d1-b076383398f1",
        "senderRole": "Patient",
        "receiver": "1575e21b-4869-4647-bcf0-ce1adf274673",
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
