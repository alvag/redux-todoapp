import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { TodoComponent } from './todo/todo.component';
import { TodosListComponent } from './todo/todos-list/todos-list.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { todoReducer } from './todo/todo.reducer';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        TodoComponent,
        TodosListComponent,
        TodoItemComponent,
        TodoFooterComponent,
        TodoAddComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({ todos: todoReducer }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
