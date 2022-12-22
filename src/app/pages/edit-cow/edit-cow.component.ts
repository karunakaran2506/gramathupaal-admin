import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-cow',
  templateUrl: './edit-cow.component.html',
  styleUrls: ['./edit-cow.component.scss']
})
export class EditCowComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  cow: any;
  vaccination: Array<any> = [];
  cowmilk: Array<any> = [];
  cowweight: Array<any> = [];
  cowdewarming: Array<any> = [];
  cowheat: Array<any> = [];
  cowteeth: Array<any> = [];
  editCowForm: FormGroup;
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

    this.cow = this.apiservice?.cowSelected;
    this.cowweight = this.cow?.cowweight;
    this.vaccination = this.cow?.vaccination;
    this.cowmilk = this.cow?.cowmilk;
    this.cowdewarming = this.cow?.cowdewarming;
    this.cowheat = this.cow?.cowheat;
    this.cowteeth = this.cow?.cowteeth;

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = this.cow?.store;
        this.store = data.stores;
      })

    this.editCowForm = new FormGroup({
      cow: new FormControl(this.cow?._id),
      store: new FormControl(this.cow?.store, Validators.required),
      name: new FormControl(this.cow?.name, Validators.required),
      gender: new FormControl(this.cow?.gender, Validators.required),
      type: new FormControl(this.cow?.type, Validators.required),
      tagnumber: new FormControl(this.cow?.tagnumber, Validators.required),
      mothercowname: new FormControl(this.cow?.mothercowname, Validators.required),
      mothercownumber: new FormControl(this.cow?.mothercownumber, Validators.required),
      fathercowname: new FormControl(this.cow?.fathercowname, Validators.required),
      fathercownumber: new FormControl(this.cow?.fathercownumber, Validators.required),
      dateofbirth: new FormControl(this.convertDate(this.cow?.dateofbirth)),
      antibiotictonobil: new FormControl(this.convertDate(this.cow?.antibiotictonobil)),
      timeofbirth: new FormControl(this.cow?.timeofbirth),
      birthweight: new FormControl(this.cow?.birthweight),
      bullname: new FormControl(this.cow?.bullname),
      breedtype: new FormControl(this.cow?.breedtype),
      bulldescription: new FormControl(this.cow?.bulldescription),
      breeddescription: new FormControl(this.cow?.breeddescription),
      vaccination: this.formBuilder.array([]),
      cowweight: this.formBuilder.array([]),
      cowmilk: this.formBuilder.array([]),
      cowdewarming: this.formBuilder.array([]),
      cowheat: this.formBuilder.array([]),
      cowteeth: this.formBuilder.array([]),
      dateofdewarming: new FormControl(this.convertDate(this.cow?.dateofdewarming)),
      dateoffirstfeedtaken: new FormControl(this.convertDate(this.cow?.dateofmilkstop)),
      dateofmilkstop: new FormControl(this.convertDate(this.cow?.dateofmilkstop)),
      dateoffirstheat: new FormControl(this.convertDate(this.cow?.dateoffirstheat)),
      dateofinsemination: new FormControl(this.convertDate(this.cow?.dateofinsemination)),
      colostrummilkweight: new FormControl(this.cow?.colostrummilkweight),
      colostrumfeeded: new FormControl(this.cow?.colostrumfeeded),
      dateofnormalmilk: new FormControl(this.convertDate(this.cow?.dateofnormalmilk)),
      dateoffirstheataftercalving: new FormControl(this.convertDate(this.cow?.dateoffirstheataftercalving)),
      dateofartificialinsemination: new FormControl(this.convertDate(this.cow?.dateofartificialinsemination)),
      dateofpregnancyconfirmation: new FormControl(this.convertDate(this.cow?.dateofpregnancyconfirmation)),
      dateofcalving: new FormControl(this.convertDate(this.cow?.dateofbirth)),
      stomachcleaning: new FormControl(this.cow?.stomachcleaning),
      calciumintake: new FormControl(this.cow?.calciumintake),
      brownsugar: new FormControl(this.cow?.brownsugar),
      exapar: new FormControl(this.cow?.exapar),
    })

    this.vaccination.forEach(vaccination => {
      const form = this.formBuilder.group({
        id: [vaccination?._id, Validators.required],
        name: [vaccination?.name, Validators.required],
        entryDate: [this.convertDate(vaccination?.entrydate), Validators.required],
        description: [vaccination?.description]
      });
      this.vaccinationForms = this.editCowForm.get('vaccination') as FormArray;
      this.vaccinationForms.push(form);
    })

    this.cowmilk.forEach(cowmilk => {
      const form = this.formBuilder.group({
        id: [cowmilk?._id, Validators.required],
        session: [cowmilk?.session, Validators.required],
        quantity: [cowmilk?.quantity, Validators.required],
        entryDate: [this.convertDate(cowmilk?.entrydate), Validators.required]
      });
      this.cowmilkForms = this.editCowForm.get('cowmilk') as FormArray;
      this.cowmilkForms.push(form);
    });

    this.cowweight.forEach(cowweight => {
      const form = this.formBuilder.group({
        id: [cowweight?._id, Validators.required],
        quantity: [cowweight?.quantity, Validators.required],
        entryDate: [this.convertDate(cowweight?.entrydate), Validators.required]
      });
      this.cowweightForms = this.editCowForm.get('cowweight') as FormArray;
      this.cowweightForms.push(form);
    })

    this.cowdewarming.forEach(cowdewarming => {
      const form = this.formBuilder.group({
        id: [cowdewarming?._id, Validators.required],
        description: [cowdewarming?.description, Validators.required],
        entryDate: [this.convertDate(cowdewarming?.entrydate), Validators.required]
      });
      this.cowdewarmingForms = this.editCowForm.get('cowdewarming') as FormArray;
      this.cowdewarmingForms.push(form);
    })

    this.cowheat.forEach(cowheat => {
      const form = this.formBuilder.group({
        id: [cowheat?._id, Validators.required],
        description: [cowheat?.description, Validators.required],
        entryDate: [this.convertDate(cowheat?.entrydate), Validators.required]
      });
      this.cowheatForms = this.editCowForm.get('cowheat') as FormArray;
      this.cowheatForms.push(form);
    })

    this.cowteeth.forEach(cowteeth => {
      const form = this.formBuilder.group({
        id: [cowteeth?._id, Validators.required],
        description: [cowteeth?.description, Validators.required],
        entryDate: [this.convertDate(cowteeth?.entrydate), Validators.required]
      });
      this.cowteethForms = this.editCowForm.get('cowteeth') as FormArray;
      this.cowteethForms.push(form);
    })
  }

  convertDate(date: Date) {
    if (date) {
      const result = moment(date).format('YYYY-MM-DD');
      return result;
    } else {
      return '';
    }
  }

  addVaccination() {
    const form = this.formBuilder.group({
      name: ['', Validators.required],
      entryDate: ['', Validators.required],
      description: ['']
    });
    this.vaccinationForms = this.editCowForm.get('vaccination') as FormArray;
    this.vaccinationForms.push(form);
  }

  removeVaccinationForm(value: number) {
    this.vaccinationForms = this.editCowForm.get('vaccination') as FormArray;
    this.vaccinationForms.removeAt(value);
  }

  addCowWeight() {
    const form = this.formBuilder.group({
      quantity: [1, Validators.required],
      entryDate: ['', Validators.required]
    });
    this.cowweightForms = this.editCowForm.get('cowweight') as FormArray;
    this.cowweightForms.push(form);
  }

  removeCowWeightForm(value: number) {
    this.cowweightForms = this.editCowForm.get('cowweight') as FormArray;
    this.cowweightForms.removeAt(value);
  }

  addCowMilk() {
    const form = this.formBuilder.group({
      session: ['', Validators.required],
      quantity: [1, Validators.required],
      entryDate: ['', Validators.required]
    });
    this.cowmilkForms = this.editCowForm.get('cowmilk') as FormArray;
    this.cowmilkForms.push(form);
  }

  removeCowMilkForm(value: number) {
    this.cowmilkForms = this.editCowForm.get('cowmilk') as FormArray;
    this.cowmilkForms.removeAt(value);
  }

  addCowDewarming() {
    const form = this.formBuilder.group({
      description: [''],
      entryDate: ['', Validators.required]
    });
    this.cowdewarmingForms = this.editCowForm.get('cowdewarming') as FormArray;
    this.cowdewarmingForms.push(form);
  }

  removeCowDewarmingForm(value: number) {
    this.cowdewarmingForms = this.editCowForm.get('cowdewarming') as FormArray;
    this.cowdewarmingForms.removeAt(value);
  }

  addCowHeat() {
    const form = this.formBuilder.group({
      description: [''],
      entryDate: ['', Validators.required]
    });
    this.cowheatForms = this.editCowForm.get('cowheat') as FormArray;
    this.cowheatForms.push(form);
  }

  removeCowHeatForm(value: number) {
    this.cowheatForms = this.editCowForm.get('cowheat') as FormArray;
    this.cowheatForms.removeAt(value);
  }

  addCowTeeth() {
    const form = this.formBuilder.group({
      description: [''],
      entryDate: ['', Validators.required]
    });
    this.cowteethForms = this.editCowForm.get('cowteeth') as FormArray;
    this.cowteethForms.push(form);
  }

  removeCowTeeth(value: number) {
    this.cowteethForms = this.editCowForm.get('cowteeth') as FormArray;
    this.cowteethForms.removeAt(value);
  }

  onSubmit(value: any) {
    if (this.editCowForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      value = {
        ...value,
        vaccination: JSON.stringify(value.vaccination),
        cowweight: JSON.stringify(value.cowweight),
        cowmilk: JSON.stringify(value.cowmilk),
        cowteeth: JSON.stringify(value.cowteeth),
        cowheat: JSON.stringify(value.cowheat),
        cowdewarming: JSON.stringify(value.cowdewarming),
      }

      this.apiservice.editCow(value)
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

  checkvaccinationForm(index: number) {
    this.vaccinationForms = this.editCowForm.get('vaccination') as FormArray;
    const result = this.vaccinationForms.at(index);
    return !!!result?.value?.id;
  }

  checkcowmilkForm(index: number) {
    this.cowmilkForms = this.editCowForm.get('cowmilk') as FormArray;
    const result = this.cowmilkForms.at(index);
    return !!!result?.value?.id;
  }

  checkcowweightForm(index: number) {
    this.cowweightForms = this.editCowForm.get('cowweight') as FormArray;
    const result = this.cowweightForms.at(index);
    return !!!result?.value?.id;
  }

  checkcowdewarmingForm(index: number) {
    this.cowdewarmingForms = this.editCowForm.get('cowdewarming') as FormArray;
    const result = this.cowdewarmingForms.at(index);
    return !!!result?.value?.id;
  }

  checkcowheatForm(index: number) {
    this.cowheatForms = this.editCowForm.get('cowheat') as FormArray;
    const result = this.cowheatForms.at(index);
    return !!!result?.value?.id;
  }

  checkcowteethForm(index: number) {
    this.cowteethForms = this.editCowForm.get('cowteeth') as FormArray;
    const result = this.cowteethForms.at(index);
    return !!!result?.value?.id;
  }

  oncancel() {
    this.router.navigateByUrl('view-cow');
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

}
