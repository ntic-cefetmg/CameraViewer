import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CameraViewerSharedModule } from '../../shared';
import {
    CameraService,
    CameraPopupService,
    CameraComponent,
    CameraDetailComponent,
    CameraDialogComponent,
    CameraPopupComponent,
    CameraDeletePopupComponent,
    CameraDeleteDialogComponent,
    cameraRoute,
    cameraPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cameraRoute,
    ...cameraPopupRoute,
];

@NgModule({
    imports: [
        CameraViewerSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CameraComponent,
        CameraDetailComponent,
        CameraDialogComponent,
        CameraDeleteDialogComponent,
        CameraPopupComponent,
        CameraDeletePopupComponent,
    ],
    entryComponents: [
        CameraComponent,
        CameraDialogComponent,
        CameraPopupComponent,
        CameraDeleteDialogComponent,
        CameraDeletePopupComponent,
    ],
    providers: [
        CameraService,
        CameraPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CameraViewerCameraModule {}
