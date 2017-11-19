import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScreenComponent } from './screen.component';
import { ScreenDetailComponent } from './screen-detail.component';
import { ScreenPopupComponent } from './screen-dialog.component';
import { ScreenDeletePopupComponent } from './screen-delete-dialog.component';

export const screenRoute: Routes = [
    {
        path: 'screen',
        component: ScreenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.screen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'screen/:id',
        component: ScreenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.screen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const screenPopupRoute: Routes = [
    {
        path: 'screen-new',
        component: ScreenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.screen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'screen/:id/edit',
        component: ScreenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.screen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'screen/:id/delete',
        component: ScreenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cameraViewerApp.screen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
