import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { MomentModule } from 'angular2-moment/moment.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';



const routes = [
    {
        path        : 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path        : 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path        : 'mail',
        loadChildren: './mail/mail.module#MailModule'
    },
    {
        path        : 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    },
    {
        path        : 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#EcommerceModule'
    },
    {
        path        : 'academy',
        loadChildren: './academy/academy.module#AcademyModule'
    },
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#TodoModule'
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FileManagerModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule'
    },
    {
        path        : 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#ScrumboardModule'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MomentModule,
        MatPaginatorModule,
        NgxPaginationModule
    ]
})
export class AppsModule
{
}
