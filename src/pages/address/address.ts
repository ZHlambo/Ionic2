import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Request} from "../../providers/Request"
import { ModalController } from 'ionic-angular'

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
  providers: [Request]
})
export class AddressPage {
  constructor(public navCtrl: NavController, public request: Request, public modal: ModalController) {
  }

}
