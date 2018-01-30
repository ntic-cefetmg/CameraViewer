import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Screen } from './screen.model';
import { ScreenService } from './screen.service';
import { AuthServerProvider } from '../../shared/auth/auth-jwt.service';

@Component({
    selector: 'jhi-screen-detail',
    templateUrl: './screen-detail.component.html'
})
export class ScreenDetailComponent implements OnInit, OnDestroy {

    screen: Screen;
    generalClass: string;
    cameraClass: string;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private screenService: ScreenService,
        private authServerProvider: AuthServerProvider,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScreens();
    }

    load(id) {
        this.screenService.find(id).subscribe((screen) => {
            this.screen = screen;
            for(var i=0; i<this.screen.cameras.length; i++){
                this.screen.cameras[i].accessURL = "http://"+window.location.hostname+":8000/"+this.screen.cameras[i].id+"/"+this.authServerProvider.getToken();
            }
            if(this.screen.cameras.length == 1){
                this.generalClass = "col-xs-12";
                this.cameraClass = "col-xs-12";
                
            } else if(this.screen.cameras.length == 4 || this.screen.cameras.length == 2){
                this.generalClass = "col-sm-8";
                this.cameraClass = "col-sm-6";
            } else if(this.screen.cameras.length == 3 || this.screen.cameras.length == 6 || this.screen.cameras.length == 5){
                this.generalClass = "col-xs-12";
                this.cameraClass = "col-sm-4";
            } else if(this.screen.cameras.length == 9 || this.screen.cameras.length == 7 || this.screen.cameras.length == 8){
                this.generalClass = "col-sm-8";
                this.cameraClass = "col-sm-4";
            }
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScreens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'screenListModification',
            (response) => this.load(this.screen.id)
        );
    }
}
