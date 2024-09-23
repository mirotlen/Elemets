import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PeriodicElement } from '../../models/periodic-eleent.model';
import { ElementService } from '../../servicies/element-data.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'elements-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './elements-table.component.html',
  styleUrls: ['./elements-table.component.css'],
})
export class ElementTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  elements: PeriodicElement[] = [];
  filteredElements: PeriodicElement[] = [];
  filterControl = new FormControl('');

  constructor(
    private elementService: ElementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.elementService.getElements().subscribe((data) => {
      this.elements = data;
      this.filteredElements = data;
    });

    this.filterControl.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((filterValue) => {
        this.applyFilter(filterValue as string);
      });
  }

  applyFilter(filterValue: string) {
    this.filteredElements = this.elements.filter(
      (element) =>
        element.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        element.symbol.toLowerCase().includes(filterValue.toLowerCase()) ||
        element.position.toString().includes(filterValue) ||
        element.weight.toString().includes(filterValue)
    );
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: { ...element },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => {
          const index = this.elements.findIndex(
            (e) => e.position === result.position
          );
          if (index !== -1) {
            this.elements[index] = result;
          }
        }),
        tap(() => this.applyFilter(this.filterControl.value as string))
      )
      .subscribe();
  }
}
