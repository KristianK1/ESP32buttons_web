import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  static behSub: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() {
    this.connect();

    HomePage.behSub.subscribe(rez => {
      this.jebotebog(rez);
    })
  }
  colorVar1 = "#DDDDDD";
  colorVar2 = "#DDDDDD";
  colorVar3 = "#DDDDDD";

  lastTimeStamp: number = 0;

  connect() {
    let date = new Date();
    console.log(date.valueOf());

    var SERVER_URL = 'wss://ws-tutorial-sviki.herokuapp.com';
    // This is a variable for our WebSocket.
    var ws;

    ws = new WebSocket(SERVER_URL, []);
    // Set the function to be called when a message is received.
    ws.onmessage = this.handleMessageReceived;
    // Set the function to be called when we have connected to the server.
    ws.onopen = this.handleConnected;
    // Set the function to be called when an error occurs.
    ws.onerror = this.handleError;
  }

  handleMessageReceived(data) {
    // Simply call logMessage(), passing the received data.
    console.log(data.data);
    let str: string = data.data;
    let date = new Date();

    if (str.includes("Recived: DA")) {
      console.log("data: Da");

   
      HomePage.behSub.next(1);

      this.lastTimeStamp = date.valueOf();
    }



    else if (str.includes("Recived: NE")) {
      console.log("data: Ne");

      
    HomePage.behSub.next(2);

      this.lastTimeStamp = date.valueOf();
    }



    else if (data.data) {
      console.log(str.includes("Recived: PONOVI"));

      HomePage.behSub.next(3);

      this.lastTimeStamp = date.valueOf();

    }
  }

  handleConnected(data) {
    var logMsg = 'Connected to server: ' + data.target.url;
    console.log(logMsg);
    setInterval(() => {
      try {
        let date = new Date()
        // console.log(date);
        // console.log(date.valueOf());
        // console.log(this.lastTimeStamp || 0);

        let timeDiffNumber = date.valueOf() - (this.lastTimeStamp || 0);
        // console.log("time diff " + timeDiffNumber);

        if (timeDiffNumber > 1000) {
          console.log("dismiss");

          HomePage.behSub.next(0);
        }
      } catch {
        console.log("greska");

        HomePage.behSub.next(0);
      }
    }, 200);
  }

  handleError(err) {
    // Print the error to the console so we can debug it.
    console.log("Error: ", err);
  }

  jebotebog(rez) {
    this.colorVar1 = "#DDDDDD";
    this.colorVar2 = "#DDDDDD";
    this.colorVar3 = "#DDDDDD";

    if (rez == 1) {
      this.colorVar1 = "#00FF00";
    }
    if (rez == 2) {
      this.colorVar2 = "#FF0000";
    }
    if (rez == 3) {
      this.colorVar3 = "#0000FF";

    }
  }


}
