import {Component, OnInit} from '@angular/core';

import {download} from 'electron-dl'

import {wallpaper} from 'wallpaper'

import Unsplash, {toJson} from 'unsplash-js'

import {screen, BrowserWindow} from 'electron'
import {ElectronService} from '../../providers/electron.service';
import {elementAttribute} from '@angular/core/src/render3/instructions';


const unsplash = new Unsplash({
  applicationId: '22f39908e88b4e0afa710914cd7e46e17ce5d5792d05170fb7e8236aebac1ff3',
  secret: '23f0bc103e9311b67a7d7285f3a2cc8759d1fea9fad486ce72d53630d85447f5',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob'
});


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  url = '';

  constructor(public electronService: ElectronService){
  }

  async ngOnInit() {
    let width = screen.getPrimaryDisplay().size.width
    let height = screen.getPrimaryDisplay().size.height
    unsplash.photos.getRandomPhoto({
      width: width,
      height: height
    }).then(toJson).then(json => {
      console.log(json);
      this.url = json.urls.custom;
      download(this.electronService.Electron.remote.BrowserWindow.getFocusedWindow(), json.urls.custom)
        .then(dl => console.log(dl))
        .catch(console.error);
    });

  }
}
