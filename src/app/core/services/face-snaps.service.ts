import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http : HttpClient){}


   
  getAllFaceSnaps(): Observable<FaceSnap[]> {
return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps') 
}


// Cette méthode :
// cherche un FaceSnap par son  id 
// dans le tableau faceSnaps avec la fonction  find()  ;
//  si le FaceSnap existe, on lui incrémente ses  snaps  ;
// sinon, on  throw  une erreur.

getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
  return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
}




// Maintenant la partie fun : vous allez modifier lempreinte de  snapFaceSnapById()  pour qu'elle accepte un deuxième argument
//  qui permettra de choisir le  snapType  – un snap, ou un unsnap.
// Cette méthode utilise  getFaceSnapById()  pour récupérer le FaceSnap, et si le deuxième argument est  'snap'
// , rajoute un snap ; sinon, elle enlève un snap.

// snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
//   // const faceSnap = this.getFaceSnapById(faceSnapId);
//   // snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
// }

snapFaceSnapById(faceSnapID: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
  return this.getFaceSnapById(faceSnapID).pipe(
      map(faceSnap => ({
          ...faceSnap,
          snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapID}`,
          updatedFaceSnap)
      )
  );
}


// // lancienne methode pour le add facesnap sans requete http client

// AddFaceSnap (formValue :{title:string ,description:string,imageUrl:string,localisation?:string}) :void{
//   const faceSnap : FaceSnap = {
//   ...formValue ,
//   createDate : new Date() ,
//   snaps: 0,
//   id : this.faceSnaps[this.faceSnaps.length - 1].id+1
//   } ; 
  
//   this.faceSnaps.push(faceSnap) ;
  
//    }

addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
  return this.getAllFaceSnaps().pipe(
       map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
       map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
       map(previousFacesnap => ({
          ...formValue,
          snaps: 0,
          createdDate: new Date(),
          id: previousFacesnap.id + 1
      })),
      switchMap(newFacesnap => this.http.post<FaceSnap>(
          'http://localhost:3000/facesnaps',
          newFacesnap)
      )
  );
}







}

