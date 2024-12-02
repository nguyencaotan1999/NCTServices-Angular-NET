import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { ScriptLoaderService } from './services/script-loader.service';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    ScriptLoaderService,
    ToastComponent
  ],
  imports: [RouterOutlet,
      HttpClientModule,
      FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UIServices';
}
