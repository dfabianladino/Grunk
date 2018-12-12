import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AddUsersComponent } from './add-users.component';



const routes = [
    {
        path: 'add-users',
        component: AddUsersComponent
    }
];

@NgModule({
    declarations: [
        AddUsersComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
// tslint:disable-next-line:class-name
export class addModule {}
