import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  mensaje:string="";

  elemento:any;

  constructor(
    public _sChats:ChatService
    ) { 
    this.cargarmensajes();
  }

  ngOnInit(): void {
    this.elemento=document.getElementById('app-mensajes');

  }
  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length===0){
      return;
    }
    this._sChats.aggregarMensaje(this.mensaje)
    .then(()=>{
      this.mensaje="";
      console.log('Mensaje enviado');
    })
    .catch(()=>{
      console.log('No se envio');
    })
  }
  cargarmensajes(){
    this._sChats.cargarMensajes().subscribe({
      next: ()=>{
        setTimeout(() => {
          
        this.elemento.scrollTop= this.elemento.scrollHeight;
        }, 20);
      },
      error:(error:any)=>{
        console.log(error);
        
      }
    })
    
  }
}
