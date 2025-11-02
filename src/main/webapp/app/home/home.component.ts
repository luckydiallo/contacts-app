import { Component, OnDestroy, OnInit, inject, signal, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUserCircle, faInfoCircle, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule, FontAwesomeModule],
})
export default class HomeComponent implements OnInit, OnDestroy {
  // ✅ Signal pour stocker le compte utilisateur
  account = signal<Account | null>(null);

  // ✅ Signal dérivé : indique si un utilisateur est connecté
  isLoggedIn = computed(() => this.account() !== null);

  private readonly destroy$ = new Subject<void>();
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  constructor(library: FaIconLibrary) {
    // ✅ Ajout des icônes nécessaires
    library.addIcons(faUserCircle, faInfoCircle, faBook);
  }

  ngOnInit(): void {
    // ✅ Surveille l’état d’authentification
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => this.account.set(account));
  }

  // ✅ Redirection vers la page de connexion
  login(): void {
    this.router.navigate(['/login']);
  }

  // ✅ Nettoyage du flux observable
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
