import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CompareValidator(compareTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const val = control.value;
        const compVal = control.root.value[compareTo];
        return val === compVal ? null : { notMatch: true };
    }
}


