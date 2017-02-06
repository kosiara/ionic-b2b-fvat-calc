import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public detailsVisible = false;

  public netValue:string;

  constructor(public navCtrl: NavController) {

  }

  onGrossValueChanged(value) {
    console.log('onGrossValueChanged' + value);
    console.log(value.target.value)

    let grossValue = value.target.value;

    this.netValue = ""+grossValue*0.78;
  }

  showOptionsClick(e) {
    this.detailsVisible = !this.detailsVisible;
    console.log(e);
    e.target.classList.toggle("up");
  }
}
