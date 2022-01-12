import { NgModule } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule, MatSelectModule, MatExpansionModule,MatIconModule, MatButtonModule, MatBottomSheetModule
  ],
  exports:[
    MatFormFieldModule, MatSelectModule, MatExpansionModule,MatIconModule, MatButtonModule, MatBottomSheetModule
  ]
})
export class MaterialModule { }
