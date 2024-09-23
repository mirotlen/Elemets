import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElementTableComponent } from './components/elements-table/elements-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ElementTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}

  title = 'ElementsTableApp';
}
