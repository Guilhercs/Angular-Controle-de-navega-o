import { AnimaisService } from './../animais.service';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from './../animais';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  animais$!: Observable<Animais>
  constructor(
    private UsuarioService: UsuarioService,
    private AnimaisService: AnimaisService,
  ) { }

  ngOnInit(): void {
    this.animais$ = this.UsuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.AnimaisService.listaDoUsuario(userName)
      })
    )
  }
}
