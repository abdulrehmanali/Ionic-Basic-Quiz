import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }
  signUpWihEmail(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  get authenticated(): boolean {
    return this.user !== null;
  }
  getEmail() {
    return this.user && this.user.email;
  }
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}

