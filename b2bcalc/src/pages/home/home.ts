import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public detailsVisible = false;

  public arrowRotationDeg = 90;

  constructor(public navCtrl: NavController) {

  }

  showOptionsClick(e) {
    this.detailsVisible = !this.detailsVisible;
    this.arrowRotationDeg =
      this.arrowRotationDeg == 0 ?  90 : 0;
    console.log(e);
    e.target.classList.toggle("up");
  }
}
