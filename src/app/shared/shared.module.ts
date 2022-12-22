import { NgModule } from '@angular/core';
import { UnitPipe } from './pipes/unit/unit.pipe';
import { CategoryPipe } from './pipes/category/category.pipe';
import { ImagePipe } from './pipes/image/image.pipe';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [UnitPipe, CategoryPipe, ImagePipe],
  imports: [],
  exports: [UnitPipe, CategoryPipe, ImagePipe, NgxMaterialTimepickerModule],
})
export class SharedModule {}
