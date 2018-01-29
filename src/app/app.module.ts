import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

import { LoaderService } from './loader.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
