import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class Unsubscribe implements OnDestroy {
  public subscription = new Subject<void>();

  public ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
