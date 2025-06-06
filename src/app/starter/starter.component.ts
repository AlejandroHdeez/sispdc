import { Component
 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from '@app/app.config.service';


@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
})
export class StarterComponent {

  appProps = this.configSrv.getAppProps();
  totalAgreements: number;
  totalAssessments: number;
  totalAthletes: number;

  constructor(
   private toastrSrv: ToastrService,
   private configSrv: AppConfigService,
  ) {
  }
}
