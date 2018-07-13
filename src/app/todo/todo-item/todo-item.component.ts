import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styles: []
})
export class TodoItemComponent implements OnInit {

    @Input() todo: Todo;
    @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

    chkField: FormControl;
    txtInput: FormControl;
    editando: boolean;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.chkField = new FormControl(this.todo.completado);
        this.txtInput = new FormControl(this.todo.texto, Validators.required);

        this.chkField.valueChanges.subscribe(valor => {
            const action = new ToggleTodoAction(this.todo.id);
            this.store.dispatch(action);
        });
    }

    editar() {
        this.editando = !this.editando;
        if (this.editando) {
            setTimeout(() => {
                this.txtInputFisico.nativeElement.select();
            }, 1);
        } else {
            this.editarTodo();
        }
    }

    editarTodo() {
        if (this.txtInput.valid) {
            const action = new EditarTodoAction(this.todo.id, this.txtInput.value);
            this.store.dispatch(action);
        }
        this.txtInputFisico.nativeElement.blur();
    }

    borrarTodo() {
        const action = new BorrarTodoAction(this.todo.id);
        this.store.dispatch(action);
    }

}
