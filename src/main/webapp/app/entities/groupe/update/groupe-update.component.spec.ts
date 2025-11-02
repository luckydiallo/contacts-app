import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { GroupeService } from '../service/groupe.service';
import { IGroupe } from '../groupe.model';
import { GroupeFormService } from './groupe-form.service';

import { GroupeUpdateComponent } from './groupe-update.component';

describe('Groupe Management Update Component', () => {
  let comp: GroupeUpdateComponent;
  let fixture: ComponentFixture<GroupeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let groupeFormService: GroupeFormService;
  let groupeService: GroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GroupeUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(GroupeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GroupeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    groupeFormService = TestBed.inject(GroupeFormService);
    groupeService = TestBed.inject(GroupeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const groupe: IGroupe = { id: 17963 };

      activatedRoute.data = of({ groupe });
      comp.ngOnInit();

      expect(comp.groupe).toEqual(groupe);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroupe>>();
      const groupe = { id: 10264 };
      jest.spyOn(groupeFormService, 'getGroupe').mockReturnValue(groupe);
      jest.spyOn(groupeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: groupe }));
      saveSubject.complete();

      // THEN
      expect(groupeFormService.getGroupe).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(groupeService.update).toHaveBeenCalledWith(expect.objectContaining(groupe));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroupe>>();
      const groupe = { id: 10264 };
      jest.spyOn(groupeFormService, 'getGroupe').mockReturnValue({ id: null });
      jest.spyOn(groupeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupe: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: groupe }));
      saveSubject.complete();

      // THEN
      expect(groupeFormService.getGroupe).toHaveBeenCalled();
      expect(groupeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroupe>>();
      const groupe = { id: 10264 };
      jest.spyOn(groupeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(groupeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
