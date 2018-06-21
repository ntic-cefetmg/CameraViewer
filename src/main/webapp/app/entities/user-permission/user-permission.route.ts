import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserPermissionComponent } from './user-permission.component';
import { UserPermissionDetailComponent } from './user-permission-detail.component';
import { UserPermissionPopupComponent } from './user-permission-dialog.component';
import { UserPermissionDeletePopupComponent } from './user-permission-delete-dialog.component';

export const userPermissionRoute: Routes = [
    {
        path: 'user-permission',
        component: UserPermissionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.userPermission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-permission/:id',
        component: UserPermissionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.userPermission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPermissionPopupRoute: Routes = [
    {
        path: 'user-permission-new',
        component: UserPermissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.userPermission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-permission/:id/edit',
        component: UserPermissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.userPermission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-permission/:id/delete',
        component: UserPermissionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.userPermission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
