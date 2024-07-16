import { AC_PostingPeriodProvider } from '../../../services/static/services.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { PostingPeriodCategoryModalPage } from '../posting-period-modal/posting-period-category-modal.page';

@Component({
  selector: 'app-posting-period',
  templateUrl: 'posting-period.page.html',
  styleUrls: ['posting-period.page.scss'],
})
export class PostingPeriodPage extends PageBase {
  @ViewChild('popoverStatus') popoverStatus;
  statusSelected;
  statusLists = [
    { Code: 'Open', Name: 'Open' },
    { Code: 'Locked', Name: 'Locked Sales' },
    { Code: 'Done', Name: 'Done' },
    { Code: 'Closed', Name: 'Closed' },
  ];
  constructor(
    public pageProvider: AC_PostingPeriodProvider,
    public branchProvider: BRA_BranchProvider,
    public modalController: ModalController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public env: EnvService,
    public navCtrl: NavController,
    public location: Location,
  ) {
    super();
  }

  preLoadData(event) {
    this.sortToggle('Id', true);
    super.preLoadData(event);
  }
  add() {
    this.openTransaction();
  }
  async openTransaction() {
    const modal = await this.modalController.create({
      component: PostingPeriodCategoryModalPage,
      componentProps: {},
      cssClass: 'modal90',
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.refresh();
    }
  }

  isPopoverStatusOpen = false;
  presentPopoverStatus(e: Event) {
    this.statusSelected = null;
    this.popoverStatus.event = e;
    this.isPopoverStatusOpen = true;
  }

  onStatusChange(status) {
    if (this.submitAttempt == false && status != null) {
      this.submitAttempt = true;
      let obj = {
        Ids: this.selectedItems.map((m) => m.Id),
        Status: status.Code,
      };
      this.pageProvider.commonService
        .connect('PUT', 'AC/PostingPeriod/ChangeStatus/', obj)
        .toPromise()
        .then((result: any) => {
          this.env.showTranslateMessage('Saved', 'success');
          this.isPopoverStatusOpen = false;
          this.refresh();
          this.submitAttempt = false;
        })
        .catch((err) => {
          this.env.showTranslateMessage('Cannot save, please try again', 'danger');
          this.submitAttempt = false;
        });
    }
  }
}
