import { Component, ViewChild } from '@angular/core';
import { Request } from "../providers/Request"
import { NavParams, ViewController, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'ItemDetail.html',
  providers: [Request]
})
export class ItemDetail {
  quantity:number = 0;
  item: any = {};
  dismiss: any = function(){};
  nowSku: any = {};
  loading: boolean = true;
  constructor(params: NavParams, request: Request, public viewCtrl: ViewController, public navCtrl: NavController) {
    this.item = params.data.item;
    this.item.skus = [];
    request.get("/shopitem/client/v1/item/" + this.item.itemid, {}).then(data => {
      this.loading = false;
      this.item = data;
      if (this.item && this.item.skus) this.nowSku = this.item.skus[0]
    })
    this.dismiss = params.data.dismiss
  }
  selectSku=(sku)=>{
    this.nowSku = sku
  }
  quantityChange=(num)=>{
    this.quantity = this.quantity || 0
    this.quantity = this.quantity + num >= 0 ? this.quantity + num : 0
  }
}
