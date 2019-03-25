import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDAUT1VrYuEpw7ZqLhDMp4lBXXX1j_NYYo",
  authDomain: "angularfire2-8ae47.firebaseapp.com",
  databaseURL: "https://angularfire2-8ae47.firebaseio.com",
  projectId: "angularfire2-8ae47",
  storageBucket: "angularfire2-8ae47.appspot.com",
  messagingSenderId: "711574640048"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
