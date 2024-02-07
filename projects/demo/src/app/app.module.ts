import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSimpleMaskModule } from "@gerandon/ngx-simple-mask";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSimpleMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
