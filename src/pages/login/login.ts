import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';
import { AuthProvider } from "./../../providers/auth/auth";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;
  inProgress: boolean;

  constructor(
    private navCtrl: NavController,
    private auth: AuthProvider,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  login() {
    this.inProgress = true;
    this.loginError = null;
    if (!this.loginForm.valid) {
      this.loginError = "Please Provide Correct Information";
      this.inProgress = false;
      return;
    }
    let data = this.loginForm.value;
    this.auth
      .signInWithEmail(data.email, data.password)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => { this.loginError = error.message; this.inProgress = false; }
      );
  }
  openSignUp() { 
    this.navCtrl.push(SignUpPage);
  }
}
