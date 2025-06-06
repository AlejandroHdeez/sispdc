import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from '@app/app.config.service';
import { CountryService } from '@services/country.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // token: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configSrv: AppConfigService,
    private countrySrv: CountryService
  ) { }

  ngOnInit(): void {
  }
}
