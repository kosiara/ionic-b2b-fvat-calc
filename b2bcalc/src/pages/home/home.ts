import {Component, ViewChild} from '@angular/core';
import {Content} from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { DBConn } from "../db/DBConn";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  public detailsVisible = false;

  public grossValue:number;
  public netValue:number;
  public vatPriceValue:number;
  public costValue:number;
  public incomeFromFvatValue:number;

  private currentVatRate:number = 23;
  private currentIncomeTaxRate:number = 18;

  private dbConn: DBConn;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    var userLang = navigator.language;
    console.log(userLang)

    this.dbConn = DBConn.Instance;
  }

  onTestClick(value) {
    let toast = this.toastCtrl.create({
      message: 'No of items:' +
      (this.dbConn._birthdays == null ? "0" : this.dbConn._birthdays.length),
      duration: 1500
    });
    toast.present();
  }

  onGrossValueChanged(value) {
    //console.log(value.target.value)

    this.grossValue = value.target.value;
    this.refreshPriceValues(ChangeOrigin.GrossValue);
  }

  onNetValueChanged(value) {
    this.netValue = value.target.value;
    this.refreshPriceValues(ChangeOrigin.NetValue);
  }

  private refreshPriceValues(changeOrigin: ChangeOrigin) {
    console.log(this.currentVatRate)
    if (changeOrigin === ChangeOrigin.GrossValue) {
      this.netValue = this.grossValue / (1 + this.currentVatRate / 100); this.netValue = +this.netValue.toFixed(2);
    }
    if (changeOrigin === ChangeOrigin.NetValue || changeOrigin === ChangeOrigin.External) {
      this.grossValue = this.netValue * (1 + this.currentVatRate / 100); this.grossValue = +this.grossValue.toFixed(2);
    }
    this.vatPriceValue = this.netValue * this.currentVatRate/100;  this.vatPriceValue = +this.vatPriceValue.toFixed(2);
    this.costValue = this.netValue * this.currentIncomeTaxRate/100;  this.costValue = +this.costValue.toFixed(2);
    this.incomeFromFvatValue = this.vatPriceValue + this.costValue;  this.incomeFromFvatValue = +this.incomeFromFvatValue.toFixed(2);
  }

  showOptionsClick(e) {
    this.detailsVisible = !this.detailsVisible;
    console.log(e);
    e.target.classList.toggle("up");
    if (this.detailsVisible) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    return new Promise((resolve) =>
      setTimeout(() => {
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.contentBottom + 300, 0);
      }, 150)
    )
  }

  onVatRateChanged(value) {
    this.refreshPriceValues(ChangeOrigin.External);
  }

  onIncomeTaxRateChanged(value) {
    this.refreshPriceValues(ChangeOrigin.External);
  }

}

enum ChangeOrigin {
    GrossValue,
    NetValue,
    External
}
