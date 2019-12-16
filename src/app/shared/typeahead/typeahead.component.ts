import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ListItem, TypeaheadSource} from '../interfaces';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {Subject} from 'rxjs';
import {ErrorStateMatcher} from '@angular/material';

@Component({
  selector: 'tdct-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TypeaheadComponent),
    multi: true
  }],
})
export class TypeaheadComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @HostBinding('tabindex') tabindex;
  @HostListener('focus') public onFocus() {
    this.inputFocused();
  }
  @ViewChild('typeahead', {static: false}) typeahead: ElementRef;
  @Input() public multiselect = false;
  @Input() public placeholder = 'type to search';
  @Input() public key: string = 'text';
  @Input() public source: TypeaheadSource;
  public _control: AbstractControl;
  @Input() set control(value: AbstractControl) {
    this._control = value;
  };
  get control(): AbstractControl {
    return this._control;
  };
  public disabled = false;
  public fc = new FormControl({disabled: this.disabled});
  public options: Array<ListItem> = [];
  public _activeItem: ListItem | null = null;
  private keyboardInputs = new Subject<string>();
  private ngUnsubscribe = new Subject<void>();
  public showOptions = false;
  public hideInput = true;

  public activeItems: Array<ListItem> = [];

  public errorMatcher: ErrorStateMatcher = {
    isErrorState: (): boolean => {
      return this.control && this.control.touched && !this.control.valid;
    }
  };

  public constructor(private sanitizer: DomSanitizer,
                     private elementRef: ElementRef) {
    this.closeOptions = this.closeOptions.bind(this);
  }

  public onBlur() {
    const self = this;
    setTimeout(() => {
      this.onTouchedCallback();
      self.hideInput = true;
    }, 100)
  }

  public onTouchedCallback() {
  }

  private onChangeCallback(item: ListItem | null | Array<ListItem>) {
  }

  public onClick(e: any) {
    if (!this.elementRef.nativeElement.contains(e.target)) {
      this.closeOptions();
    }
  }

  public inputFocused(): void {
    this.showOptions = true;
    this.hideInput = false;
    setTimeout(() => {
      this.typeahead.nativeElement.focus();
    }, 0);
  }

  public sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public closeOptions(): void {
    this.typeahead.nativeElement.value = '';
    this.keyboardInputs.next('');
    this.showOptions = false;
    this.hideInput = true;
  }

  public onInput(value: string): void {
    this.keyboardInputs.next(value);
  }

  public onPaste(value: string): void {
    this.keyboardInputs.next(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public selectMatch(option: ListItem) {
    if (this.multiselect) {
      this.activeItems.push(option);
      this.options = this.options.slice();
      this.onChangeCallback(this.activeItems);
    } else {
      this.writeValue(option);
      this.closeOptions();
    }
  }

  public clearSelection(): void {
    this.writeValue(null);
  }

  get activeItem(): ListItem | null | Array<ListItem> {
    return this._activeItem;
  }

  set activeItem(item: ListItem | null | Array<ListItem>) {
    if (Array.isArray(item)) {
      this.activeItems = item;
    } else {
      this._activeItem = item;
    }
    this.onChangeCallback(this.activeItem);
  }

  writeValue(value: ListItem | null | Array<ListItem>) {
    this.activeItem = value;
  }

  public exclude(item: ListItem) {
    const index = this.activeItems.findIndex(el => el.id === item.id);
    this.activeItems.splice(index, 1);
    this.onChangeCallback(this.activeItems);
  }


  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit(): void {

    this.keyboardInputs.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((value: string) => {
      if (value) {
        const sourceObservable = this.source(value);
        sourceObservable.pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((res: Array<ListItem>) => {
          this.options = res;
        });
      } else {
        this.options = [];
      }
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
