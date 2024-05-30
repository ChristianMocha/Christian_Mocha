import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; 
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      const [year, month, day] = control.value.split('-').map(Number);
      const inputDate = new Date(year, month - 1, day); 
      inputDate.setHours(0, 0, 0, 0); 

      console.log('Today:', today);
      console.log('Input Date:', inputDate);

      if (today <= inputDate) { 
        console.log('Valid date.');
        return null; 
      } else {
        console.log('Invalid date.');
        return { futureDate: { value: control.value } }; 
      }
    };
  }

  static oneYearAfter(dateControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateControl = control.root.get(dateControlName);
      if (!dateControl || !dateControl.value || !control.value) {
        return null;
      }

      const [releaseYear, releaseMonth, releaseDay] = dateControl.value.split('-').map(Number);
      const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay);
      releaseDate.setHours(0, 0, 0, 0);

      const [revisionYear, revisionMonth, revisionDay] = control.value.split('-').map(Number);
      const revisionDate = new Date(revisionYear, revisionMonth - 1, revisionDay);
      revisionDate.setHours(0, 0, 0, 0);

      const oneYearLater = new Date(releaseDate);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      console.log('Release Date:', releaseDate);
      console.log('Revision Date:', revisionDate);
      console.log('Expected Revision Date:', oneYearLater);

      if (revisionDate.getTime() === oneYearLater.getTime()) {
        console.log('Valid revision date.');
        return null; 
      } else {
        console.log('Invalid revision date.');
        return { oneYearAfter: { value: control.value } }; 
      }
    };
  }
}
