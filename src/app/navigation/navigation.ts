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
                id: 'authentication',
                title: 'Crear Usuario',
                type: 'collapsable',
                icon: 'account_circle',
                children: [
                    {
                        id: 'login',
                        title: 'Crear Usuario',
                        type: 'item',
                        url: '/pages/auth/login'
                    }   
                ]
            },  
        ]
        },
    {
        id: 'file-manager',
        title: 'Admistrador Archivos',
        type: 'item',
        icon: 'folder',
        url: '/apps/file-manager'   
    },
];
