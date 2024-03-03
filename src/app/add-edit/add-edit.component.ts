import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicineService } from '../service/medicine.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  medForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _medicineService: MedicineService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.medForm = this._fb.group({
      name: ['', Validators.required],
      company: [''],
      expiry_date: ['']
    });
  }

  ngOnInit(): void {
    
      this.medForm.patchValue(this.data);
    
  }

  onFormSubmit() {
    if (this.medForm.valid) { 
      if(this.data){
        this._medicineService.updateMedicine(this.data.id,this.medForm.value).subscribe({
          next: (val: any) => {
            alert('Medicine updated Successfully')
            this._dialogRef.close(true); 
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      }else{
      this._medicineService.addMedicine(this.medForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added Successfully')
          this._dialogRef.close(true); 
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    } 
  }
  }
  
}
