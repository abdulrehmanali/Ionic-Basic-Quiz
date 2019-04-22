import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthProvider } from "./../../providers/auth/auth";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  signUpForm: FormGroup;
  signUpError: string;
  inProgress: boolean;

  constructor(
    private navCtrl: NavController,
    private auth: AuthProvider,
    fb: FormBuilder
  ) {
    this.signUpForm = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }
  get email() {
    return this.signUpForm.get("email");
  }
  get password() {
    return this.signUpForm.get("password");
  }
  signUp() {
    this.inProgress = true;
    this.signUpError = null;
    if (!this.signUpForm.valid) {
      this.signUpError = "Please Provide Correct Information";
      this.inProgress = false;
      return;
    }
    let data = this.signUpForm.value;
    this.auth
      .signUpWihEmail(data.email, data.password)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => { this.signUpError = error.message; this.inProgress = false; }
      );
  }
}
