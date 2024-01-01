import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
userEmail !: string ;


imageurl = 'https://bouddha-argente.com/assets/snapface.png'
constructor(private router :Router ){}
ngOnInit(): void {
    
}

onContinue() {
this.router.navigateByUrl('FaceSnap')
  }

  onSubmitForm(form:NgForm){
    console.log(form.value); 
  }
}
