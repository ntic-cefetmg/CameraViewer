import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Screen } from './screen.model';
import { ScreenService } from './screen.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-screen',
    templateUrl: './screen.component.html'
})
export class ScreenComponent implements OnInit, OnDestroy {
screens: Screen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private screenService: ScreenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.screenService.query().subscribe(
            (res: ResponseWrapper) => {
                this.screens = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInScreens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Screen) {
        return item.id;
    }
    registerChangeInScreens() {
        this.eventSubscriber = this.eventManager.subscribe('screenListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
