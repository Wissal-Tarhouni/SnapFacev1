import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Observable, Subject, interval, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.css'
})
export class FaceSnapListComponent implements OnInit {
   
facesnaps$ !: Observable<FaceSnap[]> ;
  private destroy$ !: Subject<boolean>;

  faceSnaps !: FaceSnap [] ;

constructor( private facesnapservice : FaceSnapsService ){}

ngOnInit(): void {
this.facesnaps$ =this.facesnapservice.getAllFaceSnaps()

  this.destroy$ = new Subject<boolean>() 

// interval(1000).pipe (
// takeUntil(this.destroy$) ,
// tap(console.log)
// ).subscribe () ;
// }

//  ngOnDestroy() {
// this.destroy$.next(true)
//   }

}}