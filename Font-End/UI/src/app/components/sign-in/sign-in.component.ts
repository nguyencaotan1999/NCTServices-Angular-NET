import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements AfterViewInit {
  username: string = '';
  password: string = '';
  infor: any;
  Userinfor: any; 

  constructor(private scriptloader: ScriptLoaderService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }
 
  ngAfterViewInit(): void {
    
    if (isPlatformBrowser(this.platformId))
    {
      // this.scriptloader.loadScript('assets/js/sign-in.js');
      // const json = {
      //   data: "ABC",
      //   name: "ANCASDASD",
      //   DOB: "26/07/1999"
      // }
      // this.scriptloader.UpdateSessionInfo('testdata', json);
      // const data = this.scriptloader.GetSessionInfo('testdata');
      this.CheckloginSession();
    }

  }
  FunctionClickLogin() { 
    if (this.username.trim().length !== 0 && this.password.trim().length !== 0) {
      const user = this.username;
      const pass = this.password;
      var URL = 'https://localhost:7071/api/v1/Login?username=' + user + '&password=' + pass + '';
      this.Renderdata(URL);
    }
    
  }

  CheckloginSession() { 
    const checkexistsession = this.scriptloader.GetSessionInfo("UserInfo");
    console.log(checkexistsession);
    if (checkexistsession.data != null) { 
      this.router.navigate(['/home']).then(() => { 
        window.location.reload();
      });

    }
  }

  Renderdata(Url:string) { 
    this.scriptloader.getData(Url).subscribe(
      (data: any[]) => {
        this.Userinfor = data;
        this.infor = this.Userinfor.data;
        this.scriptloader.UpdateSessionInfo('UserInfo', this.Userinfor);
        if (this.infor != null ) {
          this.router.navigate(['/home'],{ state: { data: this.Userinfor } }).then(() => { 
            window.location.reload();
          });
        } else { 
          alert("Tài khoản và mật khẩu không hợp lệ.")
        }
      },
      (error) => {
      });

  }

  
  

}
