import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CameraViewerSharedModule } from '../../shared';
import { CameraViewerAdminModule } from '../../admin/admin.module';
import {
    UserPermissionService,
    UserPermissionPopupService,
    UserPermissionComponent,
    UserPermissionDetailComponent,
    UserPermissionDialogComponent,
    UserPermissionPopupComponent,
    UserPermissionDeletePopupComponent,
    UserPermissionDeleteDialogComponent,
    userPermissionRoute,
    userPermissionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userPermissionRoute,
    ...userPermissionPopupRoute,
];

@NgModule({
    imports: [
        CameraViewerSharedModule,
        CameraViewerAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserPermissionComponent,
        UserPermissionDetailComponent,
        UserPermissionDialogComponent,
        UserPermissionDeleteDialogComponent,
        UserPermissionPopupComponent,
        UserPermissionDeletePopupComponent,
    ],
    entryComponents: [
        UserPermissionComponent,
        UserPermissionDialogComponent,
        UserPermissionPopupComponent,
        UserPermissionDeleteDialogComponent,
        UserPermissionDeletePopupComponent,
    ],
    providers: [
        UserPermissionService,
        UserPermissionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CameraViewerUserPermissionModule {}
