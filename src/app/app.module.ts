import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service';

export * from './services/push-notification.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PushNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
