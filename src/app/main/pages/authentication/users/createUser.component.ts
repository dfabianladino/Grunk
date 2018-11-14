import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { Router, ActivatedRoute } from '@angular/router';

import { AuthService} from 'app/services/auth.service';
import { first } from 'rxjs/operators';


@Component({
    selector     : 'createUser',
    templateUrl: './createUser.component.html',
    styleUrls: ['./createUser.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CreateUserComponent implements OnInit
{
    loginForm: FormGroup;
    loginParams: any = {}; 
    error;  

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute, 
        private aut: AuthService
        
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }


    loginUser(): void {
        this.aut.login(this.loginParams.email, this.loginParams.password)
        .pipe(first())
        .subscribe((results) => {
            console.log(results);
            this.router.navigate(['/apps/dashboards/analytics']);
        }, 
        // tslint:disable-next-line:no-shadowed-variable
        error => {
            this.error = error;
            alert('Login Incorrecto');
        }); 
    }

   

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}

@Component({
    selector: 'dialog-elements-example-dialog'
    
})
// tslint:disable-next-line:component-class-suffix
export class DialogElementsExampleDialog { }
