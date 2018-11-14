import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';

import { AuthService } from 'app/services/auth.service';

@Component({
    selector     : 'file-manager',
    templateUrl  : './file-manager.component.html',
    styleUrls    : ['./file-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FileManagerComponent implements OnInit, OnDestroy
{
    selected: any;
    pathArr: string[];
    fileText: any;
    datos: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    error: any;
    

    private messageSource = new BehaviorSubject('Pruebas tabla');
    currentMessage = this.messageSource.asObservable();

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fileManagerService: FileManagerService,
        private _fuseSidebarService: FuseSidebarService,
        private _addFile: AuthService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
            this.selected = selected;
            this.pathArr = selected.location.split('>');
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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

    
    
    public fileUpload(event): void {
        const reader = new FileReader();
        reader.readAsText(event.srcElement.files[0]);
        const me = this;
       
        reader.onload = function(): void {
            me.fileText = reader.result;
            const json = me.fileText;
            me.datos = json;
            console.log(me.datos);
            me.messageSource.next(me.datos);
            if (me.datos) {
                console.log('datos del if');
                me.addFiles(me.datos);
            }
        };
    }

    addFiles(file): void {
        console.log('carga de datos');
        console.log(this.datos);
        this._addFile.addFile(this.datos)
            .pipe(first())
            .subscribe(
                data => {
                    console.log('Datos del archivo');
                    console.log(data);
                },
                error => {
                    this.error = error;
                });
    }

}
