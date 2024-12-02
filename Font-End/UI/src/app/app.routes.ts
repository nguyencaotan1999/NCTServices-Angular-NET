import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ResetComponent } from './components/reset/reset.component';
import { VerifyotpComponent } from './components/verifyotp/verifyotp.component';
import { ConfirmpasswordComponent } from './components/confirmpassword/confirmpassword.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'reset', component: ResetComponent },
    { path: 'verifyotp', component: VerifyotpComponent },
    { path: 'confirmpassword', component: ConfirmpasswordComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },
];
