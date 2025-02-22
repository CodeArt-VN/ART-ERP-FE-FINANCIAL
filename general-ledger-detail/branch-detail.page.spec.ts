import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerDetailPage } from './general-ledger-detail.page';

describe('GeneralLedgerDetailPage', () => {
	let component: GeneralLedgerDetailPage;
	let fixture: ComponentFixture<GeneralLedgerDetailPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GeneralLedgerDetailPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GeneralLedgerDetailPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
