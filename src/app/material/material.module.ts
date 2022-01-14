import { NgModule } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule, MatSelectModule, MatExpansionModule,MatIconModule, MatButtonModule, MatBottomSheetModule, MatDialogModule
  ],
  exports:[
    MatFormFieldModule, MatSelectModule, MatExpansionModule,MatIconModule, MatButtonModule, MatBottomSheetModule, MatDialogModule
  ]
})
export class MaterialModule { }
