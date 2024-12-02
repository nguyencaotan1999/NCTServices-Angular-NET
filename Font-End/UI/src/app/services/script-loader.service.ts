import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,of} from 'rxjs';
import { catchError ,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private renderer: Renderer2;
  userinforvalue: any;
  Userinforsession: any;
  constructor(rendererFactory: RendererFactory2,private http: HttpClient)
  { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  loadScript(url: string): void
  {
    const script = this.renderer.createElement('script');
    script.src = url; script.type = 'text/javascript';
    script.async = true; script.defer = true;
    this.renderer.appendChild(document.body, script);
    // Ghi log ra console để đảm bảo script đã được tải
    script.onload = () => { console.log('Script loaded successfully'); };
    script.onerror = (error: any) => { console.error('Script loading error:', error); };
  }


  getData(apiUrl: string): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
  };
    return this.http.get<any[]>(apiUrl, httpOptions);
}


postData(apiUrl: string, data: any): Observable<boolean> {
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

return this.http.post<any>(apiUrl, data, httpOptions).pipe(
  map(response => {
    if (response.succeeded) {
      return true;
    } else {
      return false;
    }
  }),
  catchError(error => {
    console.error('An error occurred:', error);
    return of(false); 
  })
);
  }
  

deleteData(apiUrl: string): Observable<boolean> {
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

return this.http.delete<any>(apiUrl, httpOptions).pipe(
  map(response => {
    if (response.succeeded) {
      return true;
    } else {
      return false;
    }
  }),
  catchError(error => {
    // Xử lý lỗi nếu cần
    console.error('An error occurred:', error);
    return of(false); // Trả về false trong trường hợp lỗi
  })
);
  }
  
  GetSessionInfo(namestring: string) { 
    this.userinforvalue = sessionStorage.getItem(namestring);
    const value = JSON.parse(this.userinforvalue); 
    return value;
  }

  UpdateSessionInfo(namestring: string,tempdata: any) { 
    sessionStorage.setItem(namestring, JSON.stringify(tempdata));
  }
  DeleteSessionInfo(namestring: string) { 
    sessionStorage.removeItem(namestring);
  }


}
