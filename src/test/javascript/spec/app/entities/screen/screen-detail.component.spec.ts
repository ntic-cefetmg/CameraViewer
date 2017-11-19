/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CameraViewerTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScreenDetailComponent } from '../../../../../../main/webapp/app/entities/screen/screen-detail.component';
import { ScreenService } from '../../../../../../main/webapp/app/entities/screen/screen.service';
import { Screen } from '../../../../../../main/webapp/app/entities/screen/screen.model';

describe('Component Tests', () => {

    describe('Screen Management Detail Component', () => {
        let comp: ScreenDetailComponent;
        let fixture: ComponentFixture<ScreenDetailComponent>;
        let service: ScreenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CameraViewerTestModule],
                declarations: [ScreenDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScreenService,
                    JhiEventManager
                ]
            }).overrideTemplate(ScreenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScreenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScreenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Screen(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.screen).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
