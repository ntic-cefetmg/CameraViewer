/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CameraViewerTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CameraDetailComponent } from '../../../../../../main/webapp/app/entities/camera/camera-detail.component';
import { CameraService } from '../../../../../../main/webapp/app/entities/camera/camera.service';
import { Camera } from '../../../../../../main/webapp/app/entities/camera/camera.model';

describe('Component Tests', () => {

    describe('Camera Management Detail Component', () => {
        let comp: CameraDetailComponent;
        let fixture: ComponentFixture<CameraDetailComponent>;
        let service: CameraService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CameraViewerTestModule],
                declarations: [CameraDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CameraService,
                    JhiEventManager
                ]
            }).overrideTemplate(CameraDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CameraDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CameraService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Camera(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.camera).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
