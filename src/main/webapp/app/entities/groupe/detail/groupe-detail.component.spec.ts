import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { GroupeDetailComponent } from './groupe-detail.component';

describe('Groupe Management Detail Component', () => {
  let comp: GroupeDetailComponent;
  let fixture: ComponentFixture<GroupeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupeDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./groupe-detail.component').then(m => m.GroupeDetailComponent),
              resolve: { groupe: () => of({ id: 10264 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GroupeDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load groupe on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GroupeDetailComponent);

      // THEN
      expect(instance.groupe()).toEqual(expect.objectContaining({ id: 10264 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
