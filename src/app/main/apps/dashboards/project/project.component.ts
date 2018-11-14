import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from 'app/main/apps/dashboards/project/project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit
{
    projects: any[];
    selectedProject: any;

    widgets: any;
    widgets2: any[];
    speed: any[];
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};
    daten: any = {};
    sizeDaten: any;
    page: any = 1;
    detail: any;
    single: any[];
    labels: any;


    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    dateNow = Date.now();

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private dateDaten: AuthService,
        private analyticsDetail: AuthService
    )
    {
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange  : 'TW',
            xAxis         : true,
            yAxis         : true,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect      : (ev) => {
                console.log(ev);
            },
            supporting    : {
                currentRange  : '',
                xAxis         : false,
                yAxis         : false,
                gradient      : false,
                legend        : false,
                showXAxisLabel: false,
                xAxisLabel    : 'Days',
                showYAxisLabel: false,
                yAxisLabel    : 'Isues',
                scheme        : {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve         : shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {



        this.projects = this._projectDashboardService.projects;
        this.selectedProject = this.projects[0];
        this.widgets = this._projectDashboardService.widgets;

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);
        
        this.analyticsDetail.getDetails().subscribe(
            result => {
                if (result.code !== 200) {
                    this.detail = result.daten;
                    console.log(result);
                    this.widgets2 = result['daten'].map(resul => resul._id.name);
                    this.speed = result['daten'].map(resul => resul.avgspeed);
                    console.log(this.widgets2);
                    
                    // datos
                    // console.log(this.detail);

                } else {
                    this.detail = result.data;
                    console.log(' Error ');
                }
            },
            error => {
                console.log(<any>error);
            }

        );

        this.dateDaten.getDaten(this.page).subscribe(
            result => {
                // console.log(this.page);
                // console.log('datos de prueba');
                // console.log(result); 
                    const resultAux = (result.users);
                    const num_pages = result.num_pages;
                    const count = result.count;
                   //  console.log(num_pages);
                    this.daten = resultAux;
                    this.sizeDaten = num_pages;
                   // console.log(this.sizeDaten);
                    this.allItems = resultAux;
                    // console.log(this.daten);

                this.setPage(this.page);
            }
        );
    }

    // tslint:disable-next-line:typedef
    setPage(page: number) {

        this.pager = this.dateDaten.getPager(this.sizeDaten, page);
        // console.log(this.pager);
        // get current page of items
        this.pagedItems = this.daten.slice(this.pager.startIndex, this.pager.endIndex + 1);
        // console.log(this.pager.startIndex);
        // console.log(this.pager.endIndex);
        // console.log(this.pagedItems);
        this.page = page;

        this.dateDaten.getDaten(this.page).subscribe(
            result => {
                // console.log(this.page);
                // console.log('datos de prueba');
                // console.log(result);
                const resultAux = (result.users);
                const num_pages = result.num_pages;
                const count = result.count;
                // console.log(num_pages);
                this.daten = resultAux;
                this.sizeDaten = num_pages;
                // console.log(this.sizeDaten);
                this.allItems = resultAux;
                // console.log(this.daten);

                this.setPage(this.page);
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11)
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

