import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select',
  imports: [SelectModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: Array<any> = [];
  @Input() placeholder: string = 'Введите значение';
  selectedValue: string = '';

  public onChange = (val: any) => {};
  public onTouched = (val: any) => {};

  writeValue(value: any): void {
    this.selectedValue = value || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(value: string) {
    this.selectedValue = value;
    this.onChange(this.selectedValue);
  }
}
