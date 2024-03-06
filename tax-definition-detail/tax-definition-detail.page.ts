import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { FINANCE_GeneralLedgerProvider, FINANCE_TaxDefinitionProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { lib } from 'src/app/services/static/global-functions';

@Component({
  selector: 'app-tax-definition-detail',
  templateUrl: './tax-definition-detail.page.html',
  styleUrls: ['./tax-definition-detail.page.scss'],
})
export class TaxDefinitionDetailPage extends PageBase {
  typeList = [];
  accountList = [];

  constructor(
    public pageProvider: FINANCE_TaxDefinitionProvider,
    public generalLedgerProvider: FINANCE_GeneralLedgerProvider,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public commonService: CommonService,
  ) {
    super();
    this.pageConfig.isDetailPage = true;

    this.formGroup = formBuilder.group({
      Id: new FormControl({ value: '', disabled: true }),
      Code: [''],
      Name: ['', Validators.required],
      Category: ['', Validators.required],
      Rate: ['', Validators.required],

      TaxAccount: [''],
      AcquisitionReverse: [''],
      NonDeduct: [''],
      AcquisitionTaxAccount: [''],
      DeferredTaxAccount: [''],
      NonDeductAccount: [''],

      Remark: [''],
      Sort: [''],
    });
  }

  preLoadData(event) {
    this.pageConfig.canEdit = true;
    Promise.all([
      this.env.getType('TaxGroup'),
      this.generalLedgerProvider.read({
        Take: 5000,
        AllChildren: true,
        AllParent: true,
      }),
    ]).then((values) => {
      this.typeList = values[0];
      this.buildFlatTree(values[1]['data'], [], true).then((resp: any) => {
        this.accountList = resp;
        this.accountList.forEach((i) => {
          i.Name = i.Code + ' - ' + i.Name;
        });
        super.preLoadData(event);
        this.accountList.forEach((i) => {
          i._searchIndex = lib.URLFormat(i.Name);
        });
      });
    });
  }

  async saveChange() {
    super.saveChange2();
  }

  selectSearchFn = (term: string, item: any) => {
    if (term.length > 1) {
      let ids = lib.searchTreeReturnId(this.accountList, term);
      return ids.indexOf(item.Id) > -1;
    }
    return false;
  };
  //[searchFn]="selectSearchFn"
}
