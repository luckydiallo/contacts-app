import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGroupe } from '../groupe.model';
import { GroupeService } from '../service/groupe.service';
import { GroupeFormGroup, GroupeFormService } from './groupe-form.service';

@Component({
  selector: 'jhi-groupe-update',
  templateUrl: './groupe-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GroupeUpdateComponent implements OnInit {
  isSaving = false;
  groupe: IGroupe | null = null;

  protected groupeService = inject(GroupeService);
  protected groupeFormService = inject(GroupeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: GroupeFormGroup = this.groupeFormService.createGroupeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupe }) => {
      this.groupe = groupe;
      if (groupe) {
        this.updateForm(groupe);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groupe = this.groupeFormService.getGroupe(this.editForm);
    if (groupe.id !== null) {
      this.subscribeToSaveResponse(this.groupeService.update(groupe));
    } else {
      this.subscribeToSaveResponse(this.groupeService.create(groupe));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupe>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(groupe: IGroupe): void {
    this.groupe = groupe;
    this.groupeFormService.resetForm(this.editForm, groupe);
  }
}
