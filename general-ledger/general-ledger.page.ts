import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { lib } from 'src/app/services/static/global-functions';
import { FINANCE_GeneralLedgerProvider } from 'src/app/services/static/services.service';
import { GeneralLedgerDetailPage } from '../general-ledger-detail/general-ledger-detail.page';


@Component({
    selector: 'app-general-ledger',
    templateUrl: 'general-ledger.page.html',
    styleUrls: ['general-ledger.page.scss']
})
export class GeneralLedgerPage extends PageBase {
    itemsState: any = [];
    isAllRowOpened = true;


    constructor(
        public pageProvider: FINANCE_GeneralLedgerProvider,
        public modalController: ModalController,
		public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        public env: EnvService,
        public navCtrl: NavController,
    ) {
        super();
        this.query.Take = 5000;
        this.query.AllChildren = true;
        this.query.AllParent = true;
    }

    loadedData(event) {
        this.buildFlatTree(this.items, this.itemsState, this.isAllRowOpened).then((resp: any) => {
            this.itemsState = resp;
        });
        super.loadedData(event);
    }




    toggleRowAll() {
        this.isAllRowOpened = !this.isAllRowOpened;
        this.itemsState.forEach(i => {
            i.showdetail = !this.isAllRowOpened;
            this.toggleRow(this.itemsState, i, true);
        });
    }

    async showModal(i) {
        this.lastIDParent = i.IDParent;
        const modal = await this.modalController.create({
            component: GeneralLedgerDetailPage,
            componentProps: {
                items: this.itemsState,
                item: i,
                id: i.Id
            },
            cssClass: 'my-custom-class'
        });
        return await modal.present();
    }

    lastIDParent = 0;
    add() {
        let newItem = {
            Id: 0,
            IsDisabled: false,
            IDType: 10,
            IDParent: this.lastIDParent
        };
        this.showModal(newItem);
    }

}
