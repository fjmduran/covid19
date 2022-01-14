import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {AngularFireModule} from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdSenseComponent } from './ad-sense.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { SafariInstallInstructionsComponent } from './safari-install-instructions/safari-install-instructions.component';
import { InstallInformationComponent } from './install-information/install-information.component';

@NgModule({
  declarations: [
    AppComponent, AdSenseComponent, BottomSheetComponent, SafariInstallInstructionsComponent, InstallInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    HttpClientModule, MaterialModule,FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
