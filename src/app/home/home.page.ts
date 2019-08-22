import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';

declare var ZenderPlayer:any ;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  zenderconfig = new Map();

  constructor(private storage: Storage , private device: Device) {

  //this.zenderconfig["uuid"]=device.uuid;
  //console.log(device.uuid);

  // Retrieve saved values
  storage.get('zenderTargetId').then((val) => {
   this.zenderconfig["targetId"]=val;
  });

  storage.get('zenderChannelId').then((val) => {
   this.zenderconfig["channelId"]=val;
  });

  storage.get('zenderEnvironment').then((val) => {
   if (!val) {
   this.zenderconfig["environment"]="production";
	} else {
   this.zenderconfig["environment"]=val;
    }
  });

  storage.get('zenderDebugEnabled').then((val) => {
   if (!val) {
   this.zenderconfig["debugEnabled"]=false;
	} else {
   this.zenderconfig["debugEnabled"]=val;
   }
  });

  storage.get('zenderUsername').then((val) => {
   if (!val) {
   this.zenderconfig["username"]="demo";
	} else {
   this.zenderconfig["username"]=val;
	}
  });

  storage.get('zenderBackgroundColor').then((val) => {
   if (!val) {
   this.zenderconfig["backgroundColor"]="#ff00ff";
	} else {
   this.zenderconfig["backgroundColor"]=val;
	}
  });

  storage.get('zenderDeviceToken').then((val) => {
   this.zenderconfig["deviceToken"]=val;
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
	'name': this.zenderconfig["username"]
    };

    var config = {
	debugEnabled: this.zenderconfig["debugEnabled"],
	backgroundColor: this.zenderconfig["backgroundColor"],
	environment: this.zenderconfig["environment"],
        //deviceToken: 'userA'
    	//redeemCode: 'userA'
    };

    ZenderPlayer.setConfig(config, function() {
    ZenderPlayer.setAuthentication(authProvider, authPayload , function() {
    ZenderPlayer.setTargetId(targetId, function() { 
    ZenderPlayer.setChannelId(channelId, function() {
    ZenderPlayer.start(function() { 
     } , function(err) { console.log(err)});
     } , function(err) { console.log(err)});
     } , function(err) { console.log(err)});
     } , function(err) { console.log(err)});
     } , function(err) { console.log(err)});
	
  }

  saveConfig() {
    console.log('saving targetId :', this.zenderconfig["targetId"]);
    console.log('saving channelId:',this.zenderconfig["channelId"]);
    console.log('saving debug:',this.zenderconfig["debug"]);
    console.log('saving environment:',this.zenderconfig["environment"]);
    console.log('saving username:',this.zenderconfig["username"]);
    console.log('saving backgroundColor:',this.zenderconfig["backgroundColor"]);

    this.storage.set('zenderTargetId',this.zenderconfig["targetId"]);
    this.storage.set('zenderChannelId',this.zenderconfig["channelId"]);
    this.storage.set('zenderDebugEnabled',this.zenderconfig["debugEnabled"]);
    this.storage.set('zenderEnvironment',this.zenderconfig["environment"]);
    this.storage.set('zenderUsername',this.zenderconfig["username"]);
    this.storage.set('zenderBackgroundcolor',this.zenderconfig["backgroundColor"]);
  }

}
