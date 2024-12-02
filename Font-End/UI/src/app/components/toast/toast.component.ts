import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastComponent  {
  constructor(private toastr : ToastrService) { 

  }

  showSuccess(message:string) { 
    this.toastr.success(message, '', {closeButton:true});
  }

  showError(message: string) { 
    this.toastr.error(message, '', {closeButton:true});
  }
  showWarning(message: string) { 
    this.toastr.warning(message, '', {closeButton:true});
  }
  showInfo(message: string) { 
    this.toastr.info(message, '', {closeButton:true});
  }
}
