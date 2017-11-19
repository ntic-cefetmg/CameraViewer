import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Camera } from './camera.model';
import { CameraService } from './camera.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-camera',
    templateUrl: './camera.component.html'
})
export class CameraComponent implements OnInit, OnDestroy {
cameras: Camera[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cameraService: CameraService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cameraService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cameras = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCameras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Camera) {
        return item.id;
    }
    registerChangeInCameras() {
        this.eventSubscriber = this.eventManager.subscribe('cameraListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
