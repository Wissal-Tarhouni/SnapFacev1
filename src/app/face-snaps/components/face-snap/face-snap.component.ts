import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.css'
})
export class FaceSnapComponent implements OnInit {


@Input() facesnap !:FaceSnap ; 
buttonText !: string;

 
  constructor(private facesnapservice : FaceSnapsService ,
    private router : Router){}


  ngOnInit(): void {

       this.buttonText='oh snap!' ;
  }
  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
        this.facesnapservice.snapFaceSnapById(this.facesnap.id, 'snap');
        this.buttonText = 'Oops, unSnap!';
    } else {
        this.facesnapservice.snapFaceSnapById(this.facesnap.id, 'unsnap');
        this.buttonText = 'Oh Snap!';
    }}


    onViewFaceSnap() {
      this.router.navigateByUrl(`FaceSnap/${this.facesnap.id}`);
    }        

}
