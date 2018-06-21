/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CameraViewerTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserPermissionDetailComponent } from '../../../../../../main/webapp/app/entities/user-permission/user-permission-detail.component';
import { UserPermissionService } from '../../../../../../main/webapp/app/entities/user-permission/user-permission.service';
import { UserPermission } from '../../../../../../main/webapp/app/entities/user-permission/user-permission.model';

describe('Component Tests', () => {

    describe('UserPermission Management Detail Component', () => {
        let comp: UserPermissionDetailComponent;
        let fixture: ComponentFixture<UserPermissionDetailComponent>;
        let service: UserPermissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CameraViewerTestModule],
                declarations: [UserPermissionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserPermissionService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserPermissionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserPermissionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPermissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserPermission(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userPermission).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
