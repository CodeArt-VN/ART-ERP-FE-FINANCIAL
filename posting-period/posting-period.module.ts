import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share.module';
import { PostingPeriodPage } from './posting-period.page';
import { PostingPeriodCategoryModalPage } from '../posting-period-modal/posting-period-category-modal.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShareModule,
    RouterModule.forChild([{ path: '', component: PostingPeriodPage }]),
  ],
  declarations: [PostingPeriodPage, PostingPeriodCategoryModalPage],
})
export class PostingPeriodPageModule {}
