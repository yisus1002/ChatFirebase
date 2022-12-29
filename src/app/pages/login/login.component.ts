import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public _schats:ChatService) { }

  ngOnInit(): void {
  }

  ingresar(proveedor:string){
    console.log(proveedor);

    // if(proveedor==="Google"){
      this._schats.login(proveedor);
    // }
  }

}
