import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  constructor() { }

  private firebase = environment.firebase;
  private appProps = environment.appProps;
  logo = './assets/images/logos/logo_sis.png';
  private supportContacts = environment.supportContacts;

  getAppProps(): any {
    return this.appProps;
  }

  getFirebase(): any {
    return this.firebase;
  }
  getSupportContacts(): any {
    return this.supportContacts;
  }
}
