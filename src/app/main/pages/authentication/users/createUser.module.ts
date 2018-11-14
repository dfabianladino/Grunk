import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { CreateUserComponent } from './createUser.component';

const routes = [
    {
        path     : 'auth/login',
        component: CreateUserComponent
    }
];

@NgModule({
    declarations: [
        CreateUserComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class CreateUserModule
{
}
