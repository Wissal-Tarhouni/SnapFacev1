import { Component, OnInit } from '@angular/core';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { ActivatedRoute } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { Observable, tap} from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.css'
})
export class SingleFaceSnapComponent implements OnInit{
    
  faceSnap$!: Observable<FaceSnap>;
    buttonText!: string;


    constructor(private facesnapservice : FaceSnapsService ,
      private route :ActivatedRoute){}
  

  
      ngOnInit() {
        this.buttonText = 'Oh Snap!';
        const faceSnapId = +this.route.snapshot.params['id'];
        this.faceSnap$ = this.facesnapservice.getFaceSnapById(faceSnapId);
    }
    onSnap(faceSnapId: number) {
      if (this.buttonText === 'Oh Snap!') {
          this.faceSnap$ = this.facesnapservice.snapFaceSnapById(faceSnapId, 'snap').pipe(
              tap(() => this.buttonText = 'Oops, unSnap!')
          );
      } else {
          this.faceSnap$ = this.facesnapservice.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
              tap(() => this.buttonText = 'Oh Snap!')
          );
      }
  }
  }
