import { Routes } from '@angular/router';
import { ElementTableComponent } from './components/elements-table/elements-table.component';

export const routes: Routes = [
  { path: 'elements', component: ElementTableComponent },
  { path: '', redirectTo: '/elements', pathMatch: 'full' },
  { path: '**', redirectTo: '/elements' },
];
