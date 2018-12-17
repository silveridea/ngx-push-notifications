import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export class PushNotificationOptions {
  public body: string;
  public icon: string;
  public sound: string;
  public data: any;
  public tag: string;
  public dir = 'auto' as NotificationDirection;
  public lang = 'en-US';
  public renotify = false;
  public sticky = false;
  public vibrate: Array<number>;
  public noscreen = false;
  public silent = true;
}

@Injectable()
export class PushNotificationService {
  constructor() {
  }
  public checkCompatibility () {
    return !!('Notification' in window);
  }
  public requestPermission(): Observable<NotificationPermission> {
    return from(Notification.requestPermission()) as Observable<NotificationPermission>;
  }
  public isPermissionGranted (permission) {
    return permission === 'granted';
  }
  public create (title: string, options?: PushNotificationOptions): Observable<any> {
    return new Observable((obs: any) => {
       if (!this.checkCompatibility()) {
         const err = 'Notifications are not available in this browser.';
         console.error(err);
         obs.error(err);
         obs.complete();
      }

      this.requestPermission().subscribe((perm: NotificationPermission) => {
        if (!this.isPermissionGranted(perm)) {
          const err = 'The user hasn\'t granted you permission to send push notifications';
          console.error(err);
          obs.error(err);
          obs.complete();
        } else {
          const notif = new Notification(title, options);
          notif.onshow = (e: any) => {
            obs.next({ notification: notif, event: e });
          };
          notif.onclick = (e: any) => {
            obs.next({ notification: notif, event: e });
          };
          notif.onerror = (e: any) => {
            obs.error({ notification: notif, event: e });
          };
          notif.onclose = (e: any) => {
            obs.next({ notification: notif, event: e });
          };
        }
      });
    });
  }
}
