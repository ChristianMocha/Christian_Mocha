import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageContainerComponent } from './public/components/message-container/message-container.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageContainerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
