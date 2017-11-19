import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Screen } from './screen.model';
import { ScreenService } from './screen.service';

@Component({
    selector: 'jhi-screen-detail',
    templateUrl: './screen-detail.component.html'
})
export class ScreenDetailComponent implements OnInit, OnDestroy {

    screen: Screen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private screenService: ScreenService,
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
