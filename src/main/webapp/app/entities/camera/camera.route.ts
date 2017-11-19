import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CameraComponent } from './camera.component';
import { CameraDetailComponent } from './camera-detail.component';
import { CameraPopupComponent } from './camera-dialog.component';
import { CameraDeletePopupComponent } from './camera-delete-dialog.component';

export const cameraRoute: Routes = [
    {
        path: 'camera',
        component: CameraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.camera.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'camera/:id',
        component: CameraDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.camera.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cameraPopupRoute: Routes = [
    {
        path: 'camera-new',
        component: CameraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.camera.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'camera/:id/edit',
        component: CameraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.camera.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'camera/:id/delete',
        component: CameraDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.camera.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
