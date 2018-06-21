import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UserPermission } from './user-permission.model';
import { UserPermissionService } from './user-permission.service';

@Component({
    selector: 'jhi-user-permission-detail',
    templateUrl: './user-permission-detail.component.html'
})
export class UserPermissionDetailComponent implements OnInit, OnDestroy {

    userPermission: UserPermission;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userPermissionService: UserPermissionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserPermissions();
    }

    load(id) {
        this.userPermissionService.find(id).subscribe((userPermission) => {
            this.userPermission = userPermission;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserPermissions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userPermissionListModification',
            (response) => this.load(this.userPermission.id)
        );
    }
}
