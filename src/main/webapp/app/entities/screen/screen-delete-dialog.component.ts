import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Screen } from './screen.model';
import { ScreenPopupService } from './screen-popup.service';
import { ScreenService } from './screen.service';

@Component({
    selector: 'jhi-screen-delete-dialog',
    templateUrl: './screen-delete-dialog.component.html'
})
export class ScreenDeleteDialogComponent {

    screen: Screen;

    constructor(
        private screenService: ScreenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.screenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'screenListModification',
                content: 'Deleted an screen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-screen-delete-popup',
    template: ''
})
export class ScreenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private screenPopupService: ScreenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.screenPopupService
                .open(ScreenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
