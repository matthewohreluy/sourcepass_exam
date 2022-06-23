import { NgModule } from "@angular/core";
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

const MaterialComponents = [
  MatSelectModule,
  MatButtonModule,
  MatInputModule
]


@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  declarations: []
})

export class MaterialModule{

}
