import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineService } from '../service/medicine.service';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'company', 'expiry_date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _medicineService: MedicineService) {}

  ngOnInit(): void {
    this.getMedicine();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMedicine() {
    this._medicineService.getMedicine().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
       
      }
    });
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe((val: any) => {
      if (val) {
        this.getMedicine();
      }
    });
  }
  openEditForm(data:any){
    const dialogRef =this.dialog.open(AddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe((val: any) => {
      if (val) {
        this.getMedicine();
      }
    });
  }
  deleteMedicine(id:number){
    this._medicineService.deleteMedicine(id).subscribe({
      next: (res)=>{
        alert('medicine deleted');
        this.getMedicine();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
