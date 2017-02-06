import {Component, ViewChild} from '@angular/core';
import {Content} from 'ionic-angular';

import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {
    var userLang = navigator.language;
    console.log(userLang)
  }

  onGrossValueChanged(value) {
    //console.log(value.target.value)

    this.grossValue = value.target.value;
    this.refreshPriceValues();
  }

  private refreshPriceValues() {
    console.log(this.currentVatRate)
    this.netValue = this.grossValue * (1 - this.currentVatRate/100); this.netValue = +this.netValue.toFixed(2);
    this.vatPriceValue = this.grossValue * this.currentVatRate/100;  this.vatPriceValue = +this.vatPriceValue.toFixed(2);
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

  scrollToBottom(){
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentBottom, 0);
  }
}
