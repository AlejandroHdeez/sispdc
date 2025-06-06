import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgHttpLoaderModule, Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgHttpLoaderModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Portal del Atleta';
  public spinkit = Spinkit;

  constructor(
  ) {
  }
}
