import { NgModule } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule, MatSelectModule, MatExpansionModule,MatIconModule, MatButtonModule
  ],
  exports:[
    MatFormFieldModule, MatSelectModule, MatExpansionModule,MatIconModule, MatButtonModule
  ]
})
export class MaterialModule { }
