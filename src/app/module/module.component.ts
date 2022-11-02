import { ModuleService } from './../services/module.service';
import { CommonValidation } from './../common/validations/common.validation';
import { ProductService } from './../services/product.service';
import { CommonData } from './../common/validations/common.data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  arrStatus: any
  products: any
  form: any
  modules: any
  
  constructor(
    fb: FormBuilder, 
    private productservice: ProductService,
     private moduleService: ModuleService
     ) {
    this.form = fb.group({
      productid: new FormControl("", [Validators.required, CommonValidation.isNumber]),
      id: new FormControl("", [Validators.required, CommonValidation.isNumber]),
      name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      description: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      status: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.arrStatus = CommonData.getStatus();
    this.productservice.getAll().subscribe((responce: any) => {
      this.products = responce
    });
    this.getModules();
  }

  getProdutId() {
    return this.form.get("productid")
  }
  getId() {
    return this.form.get("id")
  }
  getName() {
    return this.form.get("name")
  }
  getDescription() {
    return this.form.get("description")
  }
  getStatus() {
    return this.form.get("status")
  }

  getModules() {
    this.moduleService.getPagination(10, 1)
    .subscribe((responce: any) => {
      this.modules = responce
    });
  }

  create(values: any) {
    this.moduleService.create(values)
      .subscribe((responce: any) => {
        this.getModules();
      })
  }
  update(values: any) {
    this.moduleService.update(values)
      .subscribe((responce: any) => {
        this.getModules();
      })
  }
  delete(id: any) {
    this.moduleService.delete(id)
      .subscribe((responce: any) => {
        this.getModules();
      })
  }
  clear(values: any) {
    this.form.reset();
  }
}
