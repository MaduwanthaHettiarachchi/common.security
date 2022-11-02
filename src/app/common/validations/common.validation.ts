import { ProductService } from './../../services/product.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import {  Injector } from '@angular/core';

export class CommonValidation {
    static service: ProductService;

    constructor(private injectora: Injector) {
        console.log(injectora.get(ProductService))
        CommonValidation.service = injectora.get(ProductService)
    }

    static isNumber(control: AbstractControl): ValidationErrors | null {
        if (isNaN(control.value)) {
            return { isNumber: true }
        }
        return null;
    }


    static isValidProduct(control: AbstractControl): ValidationErrors | null {
        CommonValidation.service.getById(control.value as number)
            .subscribe((response: any) => {
                console.log(response)
                if (response.id == 0)
                    return { isValidProduct: true }
                else
                    return null;
            })
        return null;
    }
}