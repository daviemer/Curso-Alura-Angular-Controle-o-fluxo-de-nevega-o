import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { switchMap, first } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(private animaisService: AnimaisService,private usuarioService: UsuarioService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario)=> {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      }),first()
    )
  }
}
