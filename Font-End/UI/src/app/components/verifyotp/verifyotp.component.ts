import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyotp',
  standalone: true,
  imports: [],
  templateUrl: './verifyotp.component.html'
})
export class VerifyotpComponent implements AfterViewInit {

  constructor(elementRef: ElementRef,private router: Router) {}
  ngAfterViewInit() {

  }
  RedirectToConfirm() { 
    this.router.navigate(['/confirmpassword'], { state: { data: 'TestData' } });
  }
  BacktoReset() { 
    this.router.navigate(['/reset']).then(() => { 
      window.location.reload();
    });

  }
}
