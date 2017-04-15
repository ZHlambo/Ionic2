import { Component,ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("indexTabs") tabRef: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;

  constructor() {
    console.log(this.tab1Root)
    console.log(this)
  }
  setSelect = (num) => {
    this.tabRef.select(num)
  }
}
