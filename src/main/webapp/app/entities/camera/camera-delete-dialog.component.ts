import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Camera } from './camera.model';
import { CameraPopupService } from './camera-popup.service';
import { CameraService } from './camera.service';

@Component({
    selector: 'jhi-camera-delete-dialog',
    templateUrl: './camera-delete-dialog.component.html'
})
export class CameraDeleteDialogComponent {

    camera: Camera;

    constructor(
        private cameraService: CameraService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cameraService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cameraListModification',
                content: 'Deleted an camera'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-camera-delete-popup',
    template: ''
})
export class CameraDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cameraPopupService: CameraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cameraPopupService
                .open(CameraDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
