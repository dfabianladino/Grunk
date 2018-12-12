import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Datos',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
           

            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'Dashboards',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Datos Promedio',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'project',
                        title: 'Datos Generales',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            }
        ]
        
    },
        {
        id: 'pages',
        title: 'Gestión de Usuarios',
        type: 'group',
        icon: 'pages',
        children: [
            {
                id: 'add',
                title: 'Crear Usuario',
                type: 'collapsable',
                icon: 'account_circle',
                children: [
                    {
                        id: 'add',
                        title: 'Crear Usuario',
                        type: 'item',
                        url: '/pages/add/users'
                    }   
                ]
            },  
        ]
        },
    {
        id: 'add-users',
        title: 'Agregar Usuarios',
        type: 'item',
        icon: 'account_circle',
        url: '/pages/create/user'
    },
    {
        id: 'file-manager',
        title: 'Admistrador Archivos',
        type: 'item',
        icon: 'folder',
        url: '/apps/file-manager'   
    },
];
