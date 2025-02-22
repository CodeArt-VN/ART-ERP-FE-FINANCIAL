import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { FINANCE_TaxDefinitionProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-tax-definition',
	templateUrl: 'tax-definition.page.html',
	styleUrls: ['tax-definition.page.scss'],
	standalone: false,
})
export class TaxDefinitionPage extends PageBase {
	constructor(
		public pageProvider: FINANCE_TaxDefinitionProvider,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location
	) {
		super();
	}
}
