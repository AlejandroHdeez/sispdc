import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="branding">
    @if(options.theme === 'light') {
    <a href="javascript:void(0)" routerLink="/starter">
    <img
      src="./assets/images/logos/logo_sis.png"
      [ngStyle]="{ 'width': sidenavCollapsed ? '160px' : '50px' }" 
      class="align-middle m-2"
      alt="logo"
    />
  </a>
  } @if(options.theme === 'dark') {
       <a href="javascript:void(0)" routerLink="/starter">
        <img
          src="./assets/images/logos/light-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
      }
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();
  @Input() sidenavCollapsed: boolean = false;

  constructor(private settings: CoreService) { }
}
