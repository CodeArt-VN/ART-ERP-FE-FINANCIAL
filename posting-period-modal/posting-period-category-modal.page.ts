import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AC_PeriodCategoryProvider } from 'src/app/services/static/services.service';
@Component({
  selector: 'app-posting-period-category-modal',
  templateUrl: './posting-period-category-modal.page.html',
  styleUrls: ['./posting-period-category-modal.page.scss'],
})
export class PostingPeriodCategoryModalPage extends PageBase {
  financialYearList: { Code: number; Name: number }[] = [];
  periodTypeDataSource = [
    {
      Code: 'Year',
      Name: 'Year',
    },
    {
      Code: 'Quarter',
      Name: 'Quarter',
    },
    {
      Code: 'Month',
      Name: 'Month',
    },
  ];

  constructor(
    public pageProvider: AC_PeriodCategoryProvider,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
  ) {
    super();
    this.pageConfig.isDetailPage = false;
    this.formGroup = formBuilder.group({
      IDBranch: [this.env.selectedBranch],
      Id: new FormControl({ value: '', disabled: true }),
      Code: [''],
      Name: [''],
      PostingPeriodType: ['Month', Validators.required],
      NumberOfPeriods: [12, Validators.required],
      FinancialYear: ['', Validators.required],
      FinancialYearFirstDate: ['', Validators.required],
      DocumentDateTo: ['', Validators.required],
      IsDisabled: new FormControl({ value: '', disabled: true }),
      IsDeleted: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: true }),
      ModifiedDate: new FormControl({ value: '', disabled: true }),
    });
  }

  loadData(event = null) {
    this.generateFinancialYears();
    super.loadedData(event);
  }
  generateFinancialYears() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    const documentDateTo = new Date(nextYearDate.setDate(nextYearDate.getDate() - 1));
    this.formGroup.get('FinancialYear').setValue(currentYear);
    this.formGroup.get('Code').setValue(currentYear);
    this.formGroup.get('Name').setValue(currentYear);
    this.formGroup.get('DocumentDateTo').setValue(documentDateTo.toISOString().split('T')[0]);
    this.formGroup.get('FinancialYear').markAsDirty();
    this.formGroup.get('Code').markAsDirty();
    this.formGroup.get('Name').markAsDirty();
    this.formGroup.get('DocumentDateTo').markAsDirty();
    this.formGroup.get('PostingPeriodType').markAsDirty();
    this.formGroup.get('NumberOfPeriods').markAsDirty();
    for (let i = 0; i <= 10; i++) {
      const year = currentYear + i;
      this.financialYearList.push({ Code: year, Name: year });
    }
  }

  changeFinancialYear() {
    let financialYear = this.formGroup.get('FinancialYear').value;
    const financialYearDate = new Date(financialYear);
    financialYearDate.setFullYear(financialYearDate.getFullYear() + 1);
    const nextYearDate = new Date(financialYearDate);
    nextYearDate.setDate(nextYearDate.getDate() - 1);
    this.formGroup.get('DocumentDateTo').setValue(nextYearDate.toISOString().split('T')[0]);
    this.formGroup.get('DocumentDateTo').markAsDirty();
    this.formGroup.get('Code').setValue(financialYear);
    this.formGroup.get('Code').markAsDirty();
    this.formGroup.get('Name').setValue(financialYear);
    this.formGroup.get('Name').markAsDirty();
    this.saveChange();
  }

  changeCode() {
    let code = this.formGroup.get('Code').value;
    this.formGroup.get('Name').setValue(code);
    this.formGroup.get('Name').markAsDirty();
    this.saveChange();
  }

  changePostingPeriodType() {
    const postingPeriodType = this.formGroup.get('PostingPeriodType').value;
    let numberOfPeriods: number;

    switch (postingPeriodType) {
      case 'Year':
        numberOfPeriods = 1;
        break;
      case 'Quarter':
        numberOfPeriods = 4;
        break;
      case 'Month':
        numberOfPeriods = 12;
        break;
      default:
        break;
    }
    this.formGroup.get('NumberOfPeriods').setValue(numberOfPeriods);
    this.formGroup.get('NumberOfPeriods').markAsDirty();
    this.saveChange();
  }

  async saveChange() {
    super.saveChange2();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
