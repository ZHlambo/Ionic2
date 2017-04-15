import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Request} from "../../providers/Request"
import { ModalController } from 'ionic-angular'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Request]
})
export class LoginPage {
  constructor(public navCtrl: NavController, public request: Request, public modal: ModalController) {
  }
}
