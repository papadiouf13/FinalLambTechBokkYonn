import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITransporter } from '../transporter.model';
import { TransporterService } from '../service/transporter.service';
import { TransporterFormService, TransporterFormGroup } from './transporter-form.service';

@Component({
  standalone: true,
  selector: 'jhi-transporter-update',
  templateUrl: './transporter-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TransporterUpdateComponent implements OnInit {
  isSaving = false;
  transporter: ITransporter | null = null;

  protected transporterService = inject(TransporterService);
  protected transporterFormService = inject(TransporterFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TransporterFormGroup = this.transporterFormService.createTransporterFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transporter }) => {
      this.transporter = transporter;
      if (transporter) {
        this.updateForm(transporter);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transporter = this.transporterFormService.getTransporter(this.editForm);
    if (transporter.id !== null) {
      this.subscribeToSaveResponse(this.transporterService.update(transporter));
    } else {
      this.subscribeToSaveResponse(this.transporterService.create(transporter));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransporter>>): void {
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

  protected updateForm(transporter: ITransporter): void {
    this.transporter = transporter;
    this.transporterFormService.resetForm(this.editForm, transporter);
  }
}
