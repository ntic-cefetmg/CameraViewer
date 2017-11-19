import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CameraViewerSharedModule } from '../../shared';
import { CameraViewerAdminModule } from '../../admin/admin.module';
import {
    ScreenService,
    ScreenPopupService,
    ScreenComponent,
    ScreenDetailComponent,
    ScreenDialogComponent,
    ScreenPopupComponent,
    ScreenDeletePopupComponent,
    ScreenDeleteDialogComponent,
    screenRoute,
    screenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...screenRoute,
    ...screenPopupRoute,
];

@NgModule({
    imports: [
        CameraViewerSharedModule,
        CameraViewerAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScreenComponent,
        ScreenDetailComponent,
        ScreenDialogComponent,
        ScreenDeleteDialogComponent,
        ScreenPopupComponent,
        ScreenDeletePopupComponent,
    ],
    entryComponents: [
        ScreenComponent,
        ScreenDialogComponent,
        ScreenPopupComponent,
        ScreenDeleteDialogComponent,
        ScreenDeletePopupComponent,
    ],
    providers: [
        ScreenService,
        ScreenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CameraViewerScreenModule {}
