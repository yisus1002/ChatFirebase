import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Mensaje } from '../interface/mensaje';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje[]=[];

  public usuario:any={};

  constructor(private afs: AngularFirestore,
    public auth: AngularFireAuth,
    ) { 
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    this.auth.authState.subscribe( (user:any)=>{
      console.log(user);
      if(!user){
        return;
      }

      this.usuario.nombre= user.displayName;
      this.usuario.uid= user.uid;
      this.usuario.foto= user.photoURL;
    })
  }
  
  cargarMensajes():Observable<Mensaje[]>{
  
    return this.itemsCollection.valueChanges()
    .pipe(map((data:Mensaje[])=>{
      console.log(data);
      this.chats=[];
      for( let mensaje of data){
        this.chats.unshift(mensaje)
      } 
     return this.chats
    }))
  }

  aggregarMensaje(texto:string){

    let mensaje:Mensaje={
      mensaje: texto,
      nombre: this.usuario.nombre,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
    }

   return this.itemsCollection.add(mensaje);
  }

  login(proveedor:string) {
    if(proveedor==='Google'){
      
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }else{
      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());

    }
  }

  logout() {
    this.auth.signOut();
    this.usuario={};
  }
}
