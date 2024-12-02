import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [],
  templateUrl: './reset.component.html'
})
export class ResetComponent implements AfterViewInit {

  
  constructor(elementRef: ElementRef,private router: Router) {}
  ngAfterViewInit() {

  }

  RedirectToOTP() { 
    this.router.navigate(['/verifyotp'], { state: { data: 'TestData' } });
  }

  BacktoHomepage() { 
    this.router.navigate(['/signin']).then(() => { 
      window.location.reload();
    });
  }
}
