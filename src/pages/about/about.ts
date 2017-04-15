import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Request} from "../../providers/Request"
import {ItemDetail} from "../../components/ItemDetail"
import { ModalController } from 'ionic-angular'
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [Request]
})
export class AboutPage {
  rootCats: any = [];
  childrenCats: any = [];
  items: any = [];
  item: any = {};
  actionSheet: any = "";
  firstCatId: string = "";
  secondCatId: string = "";
  thirdCatId: string = "";
  constructor(public navCtrl: NavController, public request: Request, public modal: ModalController) {
    this.request.get("/shopitem/client/v1/cats/root", { query: { "sort": { "sortorder": 1, "_id": 1 }, "find": { "status": 1 }, "limit": 100 } }).then((data) => {
      this.rootCats = data
      // this.rootCats = data
      if (this.rootCats && this.rootCats.length > 0) this.clickFirstCat(this.rootCats[0])
    })
  }
  clickFirstCat(cat) {
    this.firstCatId = cat.catid
    this.secondCatId = ""
    this.getItems(this.firstCatId)
    this.getChildCat(cat.catid).then(data => {
      this.childrenCats = data
      for (let i = 0; i < this.childrenCats.length; i++) {
        this.getChildCat(this.childrenCats[i].catid).then(e => {
          this.childrenCats[i].children = e
        })
      }
    })

  }
  clickSecondCat(cat) {
    this.secondCatId = cat.catid
    this.thirdCatId = ""
    this.getItems(cat.catid)
  }
  clickThirdCat(cat) {
    this.thirdCatId = cat.catid
    this.getItems(cat.catid)
  }
  clickItem(item) {
    this.item = item;
    let itemModal = this.modal.create(ItemDetail, {
      item, dismiss: (dialog, buy) => {
        dialog.viewCtrl.dismiss(buy)
      }
    });
    itemModal.present();
    itemModal.onDidDismiss((buy) => {
      if (buy) this.navCtrl.push(ContactPage)
    })
  }
  getChildCat(catid) {
    return this.request.get("/shopitem/client/v1/cat/" + catid + "/children", { query: { "sort": { "sortorder": 1, "_id": 1 }, "find": { "status": 1 }, "limit": 100 } })
  }
  getItems(catid) {
    return this.request.get("/shopitem/client/v1/items/" + catid, { query: { "sort": { "_id": 1 }, "limit": 10, "find": { "status": 1 } } }).then(data => {
      this.items = data
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].price_limit = this.items[i].priceLimit && this.items[i].priceLimit[0] || {}
      }
    })
  }
}
