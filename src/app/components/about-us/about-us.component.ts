import {Component, OnInit} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons/faCoffee';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode';
import swal from 'sweetalert';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  faCoffee = faCoffee;
  faLaptopCode = faLaptopCode;

  constructor() {
  }

  ngOnInit(): void {
    document.getElementsByClassName('alert-danger')[0].innerHTML = '';
    // @ts-ignore
    document.getElementsByClassName('alert-danger')[0].classList = '';
    // @ts-ignore
    document.getElementsByClassName('footer')[0].classList = '';
  }

  disappear(): void {
    document.querySelectorAll('section').forEach((el) => el.innerHTML = '');
    setTimeout(() => {
      swal('Oh noooo', 'What have you done? all is gone...', 'error');
    }, 1000);
  }
}
