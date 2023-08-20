import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { FINANCE_GeneralLedgerProvider } from 'src/app/services/static/services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lib } from 'src/app/services/static/global-functions';


@Component({
    selector: 'app-general-ledger-detail',
    templateUrl: './general-ledger-detail.page.html',
    styleUrls: ['./general-ledger-detail.page.scss'],
})
export class GeneralLedgerDetailPage extends PageBase {
    formGroup: FormGroup;
    

    constructor(
        public pageProvider: FINANCE_GeneralLedgerProvider,
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
        this.pageConfig.isDetailPage = true;
        this.id = this.route.snapshot.paramMap.get('id');
        this.formGroup = formBuilder.group({
            IDBranch: [''],
            IDParent: [''],
            RefParentCode: [''],
            Id: [''],
            Code:['', Validators.required],
            Name: ['', Validators.required],
            ForeignName: [''],
            Remark: [''],
            ForeignRemark: [''],
            ExternalCode: [''],
            IsActiveAccount: [''],
            CurrentBalance: [''],
            OpeningBalance: [''],
            IsTaxIncome: [''],
            IsControlAccount: [''],
            IsCashAccount: [''],
            IsCapitalAccount: [''],
            IsBudget: [''],
            IsFrozenAccount: [''],
            Level: [''],
            Counter: [''],
            Sort: [''],
            IsDisabled: new FormControl({ value: '', disabled: true }),
            
        });
    }

    glList = [];
    preLoadData(){
        

        if(this.navParams){
            this.glList = JSON.parse(JSON.stringify(this.navParams.data.items));
            this.glList.forEach(i=>{
                let prefix = '';
                for (let j = 1; j < i.level; j++) {
                    prefix += '- '
                }
                i.Name = prefix + i.Name;
            })
            this.item = JSON.parse(JSON.stringify(this.navParams.data.item));
            this.id = this.navParams.data.id;

            if (this.pageConfig.canEdit || this.pageConfig.canEditGeneralLedger) {
                this.formGroup.enable()
            }

            this.removeCurrentNode();
            this.cdr.detectChanges();
            this.loadedData();
        }
    }

    loadedData(){
        this.items.forEach(i => {
            i.IssueDate = i.IssueDate? lib.dateFormat(i.IssueDate, 'yyyy-mm-dd') : '';
        });
        super.loadedData();
    }
    
    removeCurrentNode(){
        let currentItem = this.glList.find(i=>i.Id==this.id);
        if(currentItem){
            currentItem.flag = true;
            lib.markNestedNode(this.glList, this.id)
        }
    }

}
