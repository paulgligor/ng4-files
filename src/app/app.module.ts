import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Ng5FilesModule } from './ng5-files';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng5FilesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
