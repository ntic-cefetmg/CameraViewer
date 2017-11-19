import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserPermission } from './user-permission.model';
import { UserPermissionPopupService } from './user-permission-popup.service';
import { UserPermissionService } from './user-permission.service';
import { User, UserService } from '../../shared';
import { Camera, CameraService } from '../camera';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-permission-dialog',
    templateUrl: './user-permission-dialog.component.html'
})
export class UserPermissionDialogComponent implements OnInit {

    userPermission: UserPermission;
    isSaving: boolean;

    users: User[];

    cameras: Camera[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userPermissionService: UserPermissionService,
        private userService: UserService,
        private cameraService: CameraService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.cameraService.query()
            .subscribe((res: ResponseWrapper) => { this.cameras = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userPermission.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userPermissionService.update(this.userPermission));
        } else {
            this.subscribeToSaveResponse(
                this.userPermissionService.create(this.userPermission));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserPermission>) {
        result.subscribe((res: UserPermission) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserPermission) {
        this.eventManager.broadcast({ name: 'userPermissionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCameraById(index: number, item: Camera) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-user-permission-popup',
    template: ''
})
export class UserPermissionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userPermissionPopupService: UserPermissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userPermissionPopupService
                    .open(UserPermissionDialogComponent as Component, params['id']);
            } else {
                this.userPermissionPopupService
                    .open(UserPermissionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
