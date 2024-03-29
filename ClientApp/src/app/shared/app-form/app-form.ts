import { AbstractControl, AbstractControlOptions, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from "@angular/forms";


export class AppFormGroup extends UntypedFormGroup {
    constructor(
        controls: { [key: string]: AppFormControl },
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null
    ) { super(controls, validatorOrOpts); }

    formControls(): AppFormControl[] {
        return Object.keys(this.controls)
            .map(c => this.controls[c] as AppFormControl);
    }

    getValidatorMessages(name: string): string[] {
        return (this.controls[name] as AppFormControl).getValidatorMessages();
    }
}

export class AppFormControl extends UntypedFormControl {

    constructor(
        label: string, property: string,
        value: any, validator: any
    ) {
        super(value, validator);
        this.label = label;
        this.modelProperty = property;
    }

    public label: string;
    public modelProperty: string;

    getValidatorMessages() {
        let errorMessages: string[] = [];
        if (this.errors) {
            for (let error in this.errors) {
                switch (error) {
                    case "required":
                        errorMessages.push(`${this.label} cannot be empty. `);
                        break;
                    case "minlength":
                        errorMessages.push(`${this.label} must be at least 
                            ${this.errors['minlength'].requiredLength} characters long. `);
                        break;
                    case "maxlength":
                        errorMessages.push(`${this.label} can't have more than
                            ${this.errors['maxlength'].maxLength} characters. `);
                        break;
                    case "email":
                        errorMessages.push(`${this.label} must have correct format. `);
                        break;
                    case "notMatch":
                        errorMessages.push(`Passwords must match.`);
                        break;
                    case "minTags":
                        errorMessages.push(`You must add minimum of ${this.errors['minTags'].minTags} tags.`);
                        break;
                    case "maxTags":
                        errorMessages.push(`You you cannot add more than ${this.errors['maxTags'].maxTags} tags.`);
                        break;
                }
            }
        }
        return errorMessages;
    }
}
