import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent {

  @Input() showAlertMesg: string;
  @Input() showTitle: string;
  @Input() alertType ? = 'md-color';

}
