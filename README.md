# *This project is deprecated and is no longer actively maintained*

# ngx-push-notifications

Push notifications for PWA using Service Workers in Angular

**Edit: Updated to Angular 7**

[![NPM Version](https://img.shields.io/npm/v/ngx-push-notifications.svg)](https://www.npmjs.com/package/ngx-push-notifications)
[![NPM Downloads](https://img.shields.io/npm/dt/ngx-push-notifications.svg)](https://www.npmjs.com/package/ngx-push-notifications)

Official Push API documentation is here [Mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/API/Push_API).

and here [Google Developers](https://developers.google.com/web/fundamentals/push-notifications/)

## Installation

To install this library, run:

```ts
npm install ngx-push-notifications --save
```


## Setup

Import the `PushNotificationService` into your `AppModule`

```ts
import { PushNotificationService } from 'ngx-push-notifications';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [PushNotificationService],
	bootstrap: [...]
})
export class AppModule { }
...
```


Now import the `PushNotificationsService` and `PushNotificationOptions` in your component where you want to use it:

```ts
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
...
constructor(private _pushNotificationService: PushNotificationService) { }
...
```


## Requesting Permission

To request permission from the user to display push notifications call the `requestPermission()` method of `PushNotificationsService`.

```ts
ngOnInit() {
  this._pushNotificationService.requestPermission();
}
```


You can also check if permission was already granted previously.

```ts
const isGranted = this._pushNotificationService.isPermissionGranted;
```


## Pushing a Notification

Example:

```ts
myFunction() {
    const title = 'Hello';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
}
```

A notification will raise events at each stage which you can handle.


## Options

Options that can be passed to the options parameter:

```ts
export declare class PushNotificationOptions {
    body: string;
    icon: string;
    sound: string;
    data: any;
    tag: string;
    dir: NotificationDirection;
    lang: string;
    renotify: boolean;
    sticky: boolean;
    vibrate: Array<number>;
    noscreen: boolean;
    silent: boolean;
}
```

Options are the same as the Notification API in [Mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/API/Notification).


Your feedback is important


[by silveridea](http://www.silveridea.net/?utm_source=github&utm_campaign=link2)
