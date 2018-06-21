import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserPermission } from './user-permission.model';
import { UserPermissionPopupService } from './user-permission-popup.service';
import { UserPermissionService } from './user-permission.service';

@Component({
    selector: 'jhi-user-permission-delete-dialog',
    templateUrl: './user-permission-delete-dialog.component.html'
})
export class UserPermissionDeleteDialogComponent {

    userPermission: UserPermission;

    constructor(
        private userPermissionService: UserPermissionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userPermissionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userPermissionListModification',
                content: 'Deleted an userPermission'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-permission-delete-popup',
    template: ''
})
export class UserPermissionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userPermissionPopupService: UserPermissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userPermissionPopupService
                .open(UserPermissionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
