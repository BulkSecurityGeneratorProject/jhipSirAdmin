/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipSirAdminTestModule } from '../../../test.module';
import { ServiceDescriptionUpdateComponent } from 'app/entities/service-description/service-description-update.component';
import { ServiceDescriptionService } from 'app/entities/service-description/service-description.service';
import { ServiceDescription } from 'app/shared/model/service-description.model';

describe('Component Tests', () => {
  describe('ServiceDescription Management Update Component', () => {
    let comp: ServiceDescriptionUpdateComponent;
    let fixture: ComponentFixture<ServiceDescriptionUpdateComponent>;
    let service: ServiceDescriptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipSirAdminTestModule],
        declarations: [ServiceDescriptionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ServiceDescriptionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceDescriptionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceDescriptionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceDescription(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceDescription();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
