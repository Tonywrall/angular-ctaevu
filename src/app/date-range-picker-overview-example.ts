import {Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

/** @title Basic date range picker */
@Component({
  selector: 'date-range-picker-overview-example',
  templateUrl: 'date-range-picker-overview-example.html',
})
export class DateRangePickerOverviewExample {
title = 'angular-mat-datepicker-range';

dateRangeForm: FormGroup;

constructor(
  private formBuilder: FormBuilder,
) { }


range = new FormGroup({
  fromDate: new FormControl(''),
  toDate: new FormControl('')
}, { validators: this.dateRangeValidator });

ngOnInit(): void {
  this.dateRangeForm = this.formBuilder.group({
    fromDate: [null],
    toDate: [null]
  },{ validators: this.dateRangeValidator});
}

dateRangeValidator(control: any): ValidationErrors | null {
  const startDate = control.get('fromDate')?.value;
  const endDate = control.get('toDate')?.value;

   // Controllo se una delle due date non è selezionata
  if (!startDate || !endDate) {
    return null;
  }

 
  // Calcolo la differenza in giorni tra le due date
  const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Controllo se la differenza tra le date è maggiore di 30 giorni o se una delle due date è successiva alla data odierna
  if (diff > 30 || startDate > today || endDate > today) {
    console.log("ciao")
    return { invalidDateRange: true };
  }
  
 
  return null;
}

onFormSubmit() {
  console.log('Is Form Invalid', this.dateRangeForm.invalid);
}
}