import { AfterViewInit, Component,Inject ,PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmpassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './confirmpassword.component.html',
})
export class ConfirmpasswordComponent implements AfterViewInit {
  password: string = '';
  confirmPassword: string = '';
  constructor(private scriptloader: ScriptLoaderService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router,
    private toast: ToastComponent
  ) { 

  }
  ngAfterViewInit(): void
  {
    if (isPlatformBrowser(this.platformId))
    {
      // this.scriptloader.loadScript('assets/js/sign-in.js');
      
    }
    
  } 

  SubmitChangePassword() { 
    if (this.password.trim().length !== 0 && this.confirmPassword.trim().length !== 0) { 
      this.toast.showInfo('Password changed successfully');
      // this.router.navigate(['/home']).then(() => { 
      //   window.location.reload();
      // });
    }
   
  }
  BacktoOTP() { 
    this.router.navigate(['/verifyotp']).then(() => { 
      window.location.reload();
    });

  }
}
