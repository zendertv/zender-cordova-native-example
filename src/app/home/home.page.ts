import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

declare var ZenderPlayer:any ;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  zenderconfig = new Map();

  constructor(private storage: Storage) {

  // Retrieve saved values
  storage.get('targetId').then((val) => {
   this.zenderconfig["targetId"]=val;
  });

  storage.get('channelId').then((val) => {
   this.zenderconfig["channelId"]=val;
  });

  }

  public openZenderPlayer() {
   var targetId = this.zenderconfig["targetId"];
   var channelId = this.zenderconfig["channelId"];

    var listenerId=ZenderPlayer.addEventListener('onZenderPlayerClose',function(s) {
	console.log("received a Zender Player close");
	
	ZenderPlayer.stop(function() {}, function(e) { console.log(e)});
	ZenderPlayer.removeEventListener(listenerId);
    }, function(e) {
       console.log(e);
    });

    var authProvider = "device";

    var authPayload = {
	'token': 'test-user',
	'name': 'patrick'
    };

    ZenderPlayer.setAuthentication(authProvider, authPayload , function() {
    ZenderPlayer.setTargetId(targetId, function() { 
    ZenderPlayer.setChannelId(channelId, function() {
    ZenderPlayer.start(function() { 
     } , function(err) { console.log(err)});
     } , function(err) { console.log(err)});
     } , function(err) { console.log(err)});
     } , function(err) { console.log(err)});
	
  }

  saveConfig() {
    console.log('saving targetId :', this.zenderconfig["targetId"]);
    console.log('saving channelId:',this.zenderconfig["channelId"]);

    this.storage.set('targetId',this.zenderconfig["targetId"]);
    this.storage.set('channelId',this.zenderconfig["channelId"]);
  }

}
