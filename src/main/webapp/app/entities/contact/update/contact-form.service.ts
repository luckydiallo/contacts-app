import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IContact, NewContact } from '../contact.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContact for edit and NewContactFormGroupInput for create.
 */
type ContactFormGroupInput = IContact | PartialWithRequiredKeyOf<NewContact>;

type ContactFormDefaults = Pick<NewContact, 'id'>;

type ContactFormGroupContent = {
  id: FormControl<IContact['id'] | NewContact['id']>;
  nom: FormControl<IContact['nom']>;
  prenom: FormControl<IContact['prenom']>;
  email: FormControl<IContact['email']>;
  street: FormControl<IContact['street']>;
  telephone: FormControl<IContact['telephone']>;
  groupe_id: FormControl<IContact['groupe_id']>;
  user_id: FormControl<IContact['user_id']>;
};

export type ContactFormGroup = FormGroup<ContactFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContactFormService {
  createContactFormGroup(contact: ContactFormGroupInput = { id: null }): ContactFormGroup {
    const contactRawValue = {
      ...this.getFormDefaults(),
      ...contact,
    };
    return new FormGroup<ContactFormGroupContent>({
      id: new FormControl(
        { value: contactRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nom: new FormControl(contactRawValue.nom, {
        validators: [Validators.required],
      }),
      prenom: new FormControl(contactRawValue.prenom, {
        validators: [Validators.required],
      }),
      email: new FormControl(contactRawValue.email, {
        validators: [Validators.required],
      }),
      street: new FormControl(contactRawValue.street),
      telephone: new FormControl(contactRawValue.telephone, {
        validators: [Validators.required],
      }),
      groupe_id: new FormControl(contactRawValue.groupe_id),
      user_id: new FormControl(contactRawValue.user_id),
    });
  }

  getContact(form: ContactFormGroup): IContact | NewContact {
    return form.getRawValue() as IContact | NewContact;
  }

  resetForm(form: ContactFormGroup, contact: ContactFormGroupInput): void {
    const contactRawValue = { ...this.getFormDefaults(), ...contact };
    form.reset(
      {
        ...contactRawValue,
        id: { value: contactRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ContactFormDefaults {
    return {
      id: null,
    };
  }
}
