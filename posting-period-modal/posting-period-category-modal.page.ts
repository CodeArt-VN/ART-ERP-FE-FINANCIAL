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
    standalone: false
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
  minFinancialYearFirstDate: string;
  maxFinancialYearFirstDate: string;

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
    // set min FinancialYearFirstDate
    const financialYearStartDate = new Date(currentYear, 0, 1);
    financialYearStartDate.setDate(financialYearStartDate.getDate() + 1);
    this.minFinancialYearFirstDate = financialYearStartDate.toISOString().split('T')[0];
    // set max FinancialYearFirstDate
    const financialYearEndDate = new Date(currentYear + 1, 0, 1);
    financialYearEndDate.setDate(financialYearEndDate.getDate() - 1);
    this.maxFinancialYearFirstDate = financialYearEndDate.toISOString().split('T')[0];
    for (let i = 0; i <= 10; i++) {
      const year = currentYear + i;
      this.financialYearList.push({ Code: year, Name: year });
    }
  }

  changeFinancialYear() {
    let financialYear = this.formGroup.get('FinancialYear').value;
    const financialYearDate = new Date(financialYear);
    // set min FinancialYearFirstDate
    const financialYearStartDate = new Date(financialYear, 0, 1);
    financialYearStartDate.setDate(financialYearStartDate.getDate() + 1);
    this.minFinancialYearFirstDate = financialYearStartDate.toISOString().split('T')[0];
    // set FinancialYearFirstDate
    this.formGroup.get('FinancialYearFirstDate').setValue(financialYearStartDate.toISOString().split('T')[0]);
    this.formGroup.get('FinancialYearFirstDate').markAsDirty();
    // set max FinancialYearFirstDate
    const financialYearEndDate = new Date(financialYearDate.setFullYear(financialYearDate.getFullYear() + 1));
    financialYearEndDate.setDate(financialYearEndDate.getDate() - 1);
    this.maxFinancialYearFirstDate = financialYearEndDate.toISOString().split('T')[0];
    //set DocumentDateTo
    financialYearDate.setFullYear(financialYearDate.getFullYear() + 1);
    const nextYearDate = new Date(financialYearDate);
    nextYearDate.setDate(nextYearDate.getDate() - 1);
    this.formGroup.get('DocumentDateTo').setValue(nextYearDate.toISOString().split('T')[0]);
    this.formGroup.get('DocumentDateTo').markAsDirty();
    //set Code
    this.formGroup.get('Code').setValue(financialYear);
    this.formGroup.get('Code').markAsDirty();
    //set Name
    this.formGroup.get('Name').setValue(financialYear);
    this.formGroup.get('Name').markAsDirty();
  }
  changeFinancialYearFirstDate() {
    this.formGroup.get('FinancialYearFirstDate').markAsDirty();
  }

  changeCode() {
    let code = this.formGroup.get('Code').value;
    this.formGroup.get('Name').setValue(code);
    this.formGroup.get('Name').markAsDirty();
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
  }

  async saveChange() {
    this.saveChange2();
  }

  saveChange2(form = this.formGroup, publishEventCode = this.pageConfig.pageName, provider = this.pageProvider) {
    return new Promise((resolve, reject) => {
      this.formGroup.updateValueAndValidity();
      if (!form.valid) {
        this.env.showMessage('Please recheck information highlighted in red above', 'warning');
      } else if (this.submitAttempt == false) {
        this.submitAttempt = true;
        let submitItem = this.getDirtyValues(form);

        provider
          .save(submitItem, this.pageConfig.isForceCreate)
          .then((savedItem: any) => {
            resolve(savedItem);
            this.savedChange(savedItem, form);
            this.closeModal();
            if (publishEventCode) this.env.publishEvent({ Code: publishEventCode });
          })
          .catch((err) => {
            if(err.error?.InnerException?.ExceptionMessage) {
              this.env.showMessage(err.error.InnerException.ExceptionMessage, 'danger');
            }else {
              this.env.showMessage('Cannot save, please try again', 'danger');
            }
            //this.env.showTranslateMessage('Cannot save, please try again', 'danger');
            this.cdr.detectChanges();
            this.submitAttempt = false;
            reject(err);
          });
      }
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
