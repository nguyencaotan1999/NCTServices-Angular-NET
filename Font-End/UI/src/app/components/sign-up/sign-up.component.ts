import { AfterViewInit, Component,Inject,PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements AfterViewInit {
  account: string = '';
  password: string = '';
  confirmpassword: string = '';
  email: string = '';

  constructor(private router: Router,private scriptloader: ScriptLoaderService, @Inject(PLATFORM_ID) private platformId: Object, private toastService: ToastComponent) { }
 
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) { 


    }
  }

  RegisterAccountSubmit() { 
     this.SubmitData();
  }

  SubmitData() { 
    if (this.password === this.confirmpassword) {
      var URL = 'https://localhost:7071/api/v1/Register';
      const objectsubmit = {
        Name: this.account,
        Email: this.email,
        Password: this.password
      }
      this.scriptloader.postData(URL, objectsubmit).subscribe(
        result => {
          result == true ? this.toastService.showSuccess("Register Successfully") : this.toastService.showError("Register Fail! User already exists");
        }
      );
    } else { 

      this.toastService.showWarning("Please Enter correct Confirm Password.");
    }
    
  }
}
