import { Component, inject } from '@angular/core';

import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { ErrorService } from './services/error.service';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent],
})
export class AppComponent {
  private styles = ['color: indigo', 'background: #90EE90', 'font-weight: bold', 'font-size: 18px'].join(';');
  private errorServ = inject(ErrorService);
  protected error = this.errorServ.error;

  constructor() {
    console.log(
      '%cUse local setup by cloning the project to see it in full power with backend api calls.',
      'color: green; background: yellow; font-size: 23px',
    );
    console.log('%c%s', this.styles, `git clone https://github.com/actionanand/angular-http-project.git`);
    console.log('GitHub Location: ' + 'https://github.com/actionanand/angular-http-project');
  }
}
