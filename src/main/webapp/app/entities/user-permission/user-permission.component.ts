import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { UserPermission } from './user-permission.model';
import { UserPermissionService } from './user-permission.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-permission',
    templateUrl: './user-permission.component.html'
})
export class UserPermissionComponent implements OnInit, OnDestroy {
userPermissions: UserPermission[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userPermissionService: UserPermissionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userPermissionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.userPermissions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserPermissions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserPermission) {
        return item.id;
    }
    registerChangeInUserPermissions() {
        this.eventSubscriber = this.eventManager.subscribe('userPermissionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
