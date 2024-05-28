import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/app.guard';

export const FINANCIALRoutes: Routes = [
    
    // { path: 'general-ledger', loadChildren: () => import('./general-ledger/general-ledger.module').then(m => m.GeneralLedgerPageModule), canActivate: [AuthGuard] },
    // { path: 'general-ledger/:id', loadChildren: () => import('./general-ledger-detail/general-ledger-detail.module').then(m => m.GeneralLedgerDetailPageModule), canActivate: [AuthGuard] },
    // { path: 'tax-definition', loadChildren: () => import('./tax-definition/tax-definition.module').then(m => m.TaxDefinitionPageModule), canActivate: [AuthGuard] },
    // { path: 'tax-definition/:id', loadChildren: () => import('./tax-definition-detail/tax-definition-detail.module').then(m => m.TaxDefinitionDetailPageModule), canActivate: [AuthGuard] },
  
];
