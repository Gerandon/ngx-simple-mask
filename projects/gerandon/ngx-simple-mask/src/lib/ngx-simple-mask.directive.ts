import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {
  NgControl,
  ControlValueAccessor,
} from "@angular/forms";
import {Subject} from "rxjs";

@Directive({
  selector: 'input[ngxSimpleMask]'
})
export class NgxSimpleMaskDirective implements ControlValueAccessor, OnInit, OnDestroy {

  @Input('ngxSimpleMask') public mask!: string;
  @Input() public useMaskedValue = true;

  public onChange = (_: any) => {};
  public onTouch = () => {};

  private readonly destroy$ = new Subject();
  private readonly inputEl: HTMLInputElement;
  private maskedValue: string = '';
  private unmaskedValue: string = '';

  private readonly rules: { [key: string]: (value: any, rule: string) => any } = {
    ['N']: (value: any, rule: string) => isNaN(Number(value)) ? false : Number(value),
    ['T']: (value: any, rule: string) => String(rule.split(':')[1]),
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event?: KeyboardEvent) {
    this.writeValue(this.inputEl.value);
    if (this.useMaskedValue) {
      this.onChange(this.inputEl.value);
    } else {
      this.onChange(this.unmaskFn(this.inputEl.value));
    }
  }

  constructor(elementRef: ElementRef,
              private readonly ngControl: NgControl) {
    ngControl.valueAccessor = this;
    this.inputEl = elementRef.nativeElement;
  }

  ngOnInit() {
    if (!this.mask) {
      throw Error('No mask provided!')
    }
    this.writeValue(this.ngControl.value);
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    // called when control changed from outside here
    this.inputEl.value = this.maskFn(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.inputEl.disabled = isDisabled;
  }

  private maskFn(value: any) {
    const splitMask = this.mask.split(/({.*?})/);
    const splitValue: string[] = value.split('');
    let returnValue = '';
    splitMask.forEach((maskRule) => {
      if (maskRule.startsWith('{')) {
        const cleanRule = maskRule.replace(/({|})/g, '').split(':')[0];
        const rule = this.rules[cleanRule];
        if (rule && rule(splitValue[0], maskRule.replace(/({|})/g, ''))) {
          console.log(splitValue)
          returnValue += rule(splitValue[0], maskRule.replace(/({|})/g, ''));
        }
        splitValue.splice(0, 1);
      } else {
        returnValue += maskRule;
      }
    });
    return returnValue;
  }

  private unmaskFn(value: any) {
    return value;
  }
}
