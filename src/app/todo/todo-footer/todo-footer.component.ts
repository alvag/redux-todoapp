import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Todo } from '../models/todo.model';

@Component({
    selector: 'app-todo-footer',
    templateUrl: './todo-footer.component.html',
    styles: []
})
export class TodoFooterComponent implements OnInit {

    pendientes: number;
    filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
    filtroActual: fromFiltro.filtrosValidos;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.store.subscribe(state => {
            this.filtroActual = state.filtro;
            this.contarPendientes(state.todos);
        });
    }

    cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos) {
        const action = new fromFiltro.SetFilterAction(nuevoFiltro);
        this.store.dispatch(action);
    }

    contarPendientes(todos: Todo[]) {
        this.pendientes = todos.filter(todo => !todo.completado).length;
    }

}
