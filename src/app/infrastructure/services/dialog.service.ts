import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface DialogConfig {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  autoFocus?: boolean;
  disableClose?: boolean;
  panelClass?: string | string[];
  backdropClass?: string | string[];
}

const DEFAULT_DIALOG_CONFIG: DialogConfig = {
  width: '60vw',
  maxWidth: '800px',
  autoFocus: true,
  disableClose: true,
  panelClass: ['rounded-lg', 'overflow-hidden'],
  backdropClass: 'bg-black/50'
};

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  openDialog<T, R>(
    component: any,
    data?: T,
    config: Partial<DialogConfig> = {}
  ): Observable<R> {
    const dialogConfig = {
      ...DEFAULT_DIALOG_CONFIG,
      ...config,
      data
    };

    const dialogRef = this.dialog.open<any, T, R>(component, dialogConfig);
    return dialogRef.afterClosed().pipe(
      filter((result): result is R => result !== undefined)
    );
  }
}