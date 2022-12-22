import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-cow',
  templateUrl: './add-cow.component.html',
  styleUrls: ['./add-cow.component.scss']
})
export class AddCowComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addCowForm: FormGroup;
  vaccinationForms: FormArray;
  cowweightForms: FormArray;
  cowmilkForms: FormArray;
  cowdewarmingForms: FormArray;
  cowheatForms: FormArray;
  cowteethForms: FormArray;
  storeSelected: any;
  store = [];

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.addCowForm = new FormGroup({
      store: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      tagnumber: new FormControl('', Validators.required),
      mothercowname: new FormControl('', Validators.required),
      mothercownumber: new FormControl('', Validators.required),
      fathercowname: new FormControl('', Validators.required),
      fathercownumber: new FormControl('', Validators.required),
      antibiotictonobil: new FormControl(false, Validators.required),
      dateofbirth: new FormControl(''),
      bullname: new FormControl(''),
      bulldescription: new FormControl(''),
      breedtype: new FormControl(''),
      breeddescription: new FormControl(''),
      timeofbirth: new FormControl(''),
      birthweight: new FormControl(''),
      vaccination: this.formBuilder.array([]),
      cowweight: this.formBuilder.array([]),
      cowmilk: this.formBuilder.array([]),
      cowdewarming: this.formBuilder.array([]),
      cowheat: this.formBuilder.array([]),
      cowteeth: this.formBuilder.array([]),
      dateofdewarming: new FormControl(''),
      dateoffirstfeedtaken: new FormControl(''),
      dateofmilkstop: new FormControl(''),
      dateoffirstheat: new FormControl(''),
      dateofinsemination: new FormControl(''),
      colostrummilkweight: new FormControl(''),
      colostrumfeeded: new FormControl(''),
      dateofnormalmilk: new FormControl(''),
      dateoffirstheataftercalving: new FormControl(''),
      dateofartificialinsemination: new FormControl(''),
      dateofpregnancyconfirmation: new FormControl(''),
      dateofcalving: new FormControl(''),
      stomachcleaning: new FormControl(false),
      calciumintake: new FormControl(false),
      brownsugar: new FormControl(false),
      exapar: new FormControl(false),
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data.stores[0]._id;
        this.store = data.stores;
      })
  }

  addVaccination() {
    const form = this.formBuilder.group({
      name: ['', Validators.required],
      entryDate: ['', Validators.required],
      description: ['']
    });
    this.vaccinationForms = this.addCowForm.get('vaccination') as FormArray;
    this.vaccinationForms.push(form);
  }

  removeVaccinationForm(value: number) {
    this.vaccinationForms = this.addCowForm.get('vaccination') as FormArray;
    this.vaccinationForms.removeAt(value);
  }

  addCowWeight() {
    const form = this.formBuilder.group({
      quantity: [1, Validators.required],
      entryDate: ['', Validators.required]
    });
    this.cowweightForms = this.addCowForm.get('cowweight') as FormArray;
    this.cowweightForms.push(form);
  }

  removeCowWeightForm(value: number) {
    this.cowweightForms = this.addCowForm.get('cowweight') as FormArray;
    this.cowweightForms.removeAt(value);
  }

  addCowMilk() {
    const form = this.formBuilder.group({
      session: ['', Validators.required],
      quantity: [1, Validators.required],
      entryDate: ['', Validators.required]
    });
    this.cowmilkForms = this.addCowForm.get('cowmilk') as FormArray;
    this.cowmilkForms.push(form);
  }

  removeCowMilkForm(value: number) {
    this.cowmilkForms = this.addCowForm.get('cowmilk') as FormArray;
    this.cowmilkForms.removeAt(value);
  }

  addCowDewarming() {
    const form = this.formBuilder.group({
      description: [''],
      entryDate: ['', Validators.required]
    });
    this.cowdewarmingForms = this.addCowForm.get('cowdewarming') as FormArray;
    this.cowdewarmingForms.push(form);
  }

  removeCowDewarmingForm(value: number) {
    this.cowdewarmingForms = this.addCowForm.get('cowdewarming') as FormArray;
    this.cowdewarmingForms.removeAt(value);
  }

  addCowHeat() {
    const form = this.formBuilder.group({
      description: [''],
      entryDate: ['', Validators.required]
    });
    this.cowheatForms = this.addCowForm.get('cowheat') as FormArray;
    this.cowheatForms.push(form);
  }

  removeCowHeatForm(value: number) {
    this.cowheatForms = this.addCowForm.get('cowheat') as FormArray;
    this.cowheatForms.removeAt(value);
  }

  addCowTeeth() {
    const form = this.formBuilder.group({
      description: [''],
      entryDate: ['', Validators.required]
    });
    this.cowteethForms = this.addCowForm.get('cowteeth') as FormArray;
    this.cowteethForms.push(form);
  }

  removeCowTeeth(value: number) {
    this.cowteethForms = this.addCowForm.get('cowteeth') as FormArray;
    this.cowteethForms.removeAt(value);
  }

  onSubmit(value: any) {
    if (this.addCowForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      value = {
        ...value,
        vaccination: JSON.stringify(value.vaccination),
        cowweight: JSON.stringify(value.cowweight),
        cowmilk: JSON.stringify(value.cowmilk),
        cowdewarming: JSON.stringify(value.cowdewarming),
        cowheat: JSON.stringify(value.cowheat),
        cowteeth: JSON.stringify(value.cowteeth),
      }

      this.apiservice.addCow(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('view-cow')
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

}
