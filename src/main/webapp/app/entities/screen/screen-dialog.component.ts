import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Screen } from './screen.model';
import { ScreenPopupService } from './screen-popup.service';
import { ScreenService } from './screen.service';
import { Camera, CameraService } from '../camera';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-screen-dialog',
    templateUrl: './screen-dialog.component.html'
})
export class ScreenDialogComponent implements OnInit {

    screen: Screen;
    isSaving: boolean;

    cameras: Camera[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private screenService: ScreenService,
        private cameraService: CameraService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cameraService.query()
            .subscribe((res: ResponseWrapper) => { this.cameras = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.screen.id !== undefined) {
            this.subscribeToSaveResponse(
                this.screenService.update(this.screen));
        } else {
            this.subscribeToSaveResponse(
                this.screenService.create(this.screen));
        }
    }

    private subscribeToSaveResponse(result: Observable<Screen>) {
        result.subscribe((res: Screen) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Screen) {
        this.eventManager.broadcast({ name: 'screenListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
    selector: 'jhi-screen-popup',
    template: ''
})
export class ScreenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private screenPopupService: ScreenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.screenPopupService
                    .open(ScreenDialogComponent as Component, params['id']);
            } else {
                this.screenPopupService
                    .open(ScreenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
