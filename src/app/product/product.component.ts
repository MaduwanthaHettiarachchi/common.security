import { CommonData } from './../common/validations/common.data';
import { ProductService } from './../services/product.service';
import { CommonValidation } from './../common/validations/common.validation';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  form: any;
  products = []
  arrStatus = CommonData.getStatus();
  constructor(private service: ProductService) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), CommonValidation.isNumber]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      status: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProductid() {
    return this.form.get('id');
  }

  getName() {
    return this.form.get('name');
  }

  getStatus() {
    return this.form.get('status');
  }

  getProducts() {
    this.service.getPagination(10, 1).subscribe((response: any) => {
      this.products = response;
    })
  }

  submit(values: any) {
    this.service.create(values).subscribe((res: any) => {
      this.getProducts();
    })
  }

  update(values: any) {
    this.service.update(values).subscribe(res => {
      this.getProducts();
    })
  }

  delete(id: any) {
    this.service.delete(id).subscribe(res => {
      this.getProducts();
    })
  }

  rowClick(id: number) {
    this.service.getById(id)
      .subscribe((res: any) => {
      })
  }

  clear() {
    this.form.reset();
  }

  // getValidatio() {
  //   this.service.getById(10)
  //     .subscribe((response: any) => {
  //       console.log(response)
  //       if (response.id == 0)
  //         return { isValidProduct: true }
  //       else
  //         return null;
  //     })
  // }

}
