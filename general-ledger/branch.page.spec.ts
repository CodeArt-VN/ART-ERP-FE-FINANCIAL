import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralLedgerPage } from './general-ledger.page';

describe('GeneralLedgerPage', () => {
  let component: GeneralLedgerPage;
  let fixture: ComponentFixture<GeneralLedgerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralLedgerPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralLedgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
