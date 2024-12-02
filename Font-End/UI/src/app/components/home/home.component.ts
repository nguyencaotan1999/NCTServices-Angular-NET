import { AfterViewInit, Component,Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,CommonModule } from '@angular/common';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  Username: string = '';
  existUser: boolean = false;
  constructor(private services: ScriptLoaderService, @Inject(PLATFORM_ID) private platformId: Object) {
   
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
    {
      const userinfo = this.services.GetSessionInfo('UserInfo');

        if (userinfo != null) {
        this.existUser = true;
        this.Username = userinfo.data.userName;
      } else { 
        this.existUser = false;
      }
        }
  }
  ngAfterViewInit(): void {
    
  }
  logout() { 
    this.services.DeleteSessionInfo('UserInfo');
    window.location.reload();
  }
  

}
