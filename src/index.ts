import { NgModule } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service';

export * from './services/push-notification.service';

@NgModule({
  providers: [ PushNotificationService ]
})
export class PushNotificationModule {}
