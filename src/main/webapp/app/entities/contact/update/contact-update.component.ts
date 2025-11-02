import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGroupe } from 'app/entities/groupe/groupe.model';
import { GroupeService } from 'app/entities/groupe/service/groupe.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { ContactService } from '../service/contact.service';
import { IContact } from '../contact.model';
import { ContactFormGroup, ContactFormService } from './contact-form.service';

@Component({
  selector: 'jhi-contact-update',
  templateUrl: './contact-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ContactUpdateComponent implements OnInit {
  isSaving = false;
  contact: IContact | null = null;

  groupesSharedCollection: IGroupe[] = [];
  usersSharedCollection: IUser[] = [];

  protected contactService = inject(ContactService);
  protected contactFormService = inject(ContactFormService);
  protected groupeService = inject(GroupeService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ContactFormGroup = this.contactFormService.createContactFormGroup();

  compareGroupe = (o1: IGroupe | null, o2: IGroupe | null): boolean => this.groupeService.compareGroupe(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contact }) => {
      this.contact = contact;
      if (contact) {
        this.updateForm(contact);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contact = this.contactFormService.getContact(this.editForm);
    if (contact.id !== null) {
      this.subscribeToSaveResponse(this.contactService.update(contact));
    } else {
      this.subscribeToSaveResponse(this.contactService.create(contact));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContact>>): void {
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

  protected updateForm(contact: IContact): void {
    this.contact = contact;
    this.contactFormService.resetForm(this.editForm, contact);

    this.groupesSharedCollection = this.groupeService.addGroupeToCollectionIfMissing<IGroupe>(
      this.groupesSharedCollection,
      contact.groupe_id,
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, contact.user_id);
  }

  protected loadRelationshipsOptions(): void {
    this.groupeService
      .query()
      .pipe(map((res: HttpResponse<IGroupe[]>) => res.body ?? []))
      .pipe(map((groupes: IGroupe[]) => this.groupeService.addGroupeToCollectionIfMissing<IGroupe>(groupes, this.contact?.groupe_id)))
      .subscribe((groupes: IGroupe[]) => (this.groupesSharedCollection = groupes));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.contact?.user_id)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
