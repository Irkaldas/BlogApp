import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

export function MinTagValidator(minTags: number, tags$: BehaviorSubject<Array<string>>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return tags$.value.length > minTags ? null : {
            minTags: {
                minTags: minTags
            }
        };
    }
}

export function MaxTagValidator(maxTags: number, tags$: BehaviorSubject<Array<string>>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return tags$.value.length < maxTags ? null : {
            maxTags: {
                maxTags: maxTags
            }
        };
    }
}