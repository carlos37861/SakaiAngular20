import { Component, signal } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-qrscanner',
  standalone: true,
  imports: [DialogModule, ButtonModule, ZXingScannerModule],
  templateUrl: './qrscanner.html',
  styleUrl: './qrscanner.scss',
})
export class Qrscanner {
  visible = signal(false);

  formats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.ITF,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.DATA_MATRIX
  ];

  scanSuccessClick = signal(0);
  scannedValue = signal<string | null>(null);

  open() {
    // ✅ reset para que al abrir vuelva a escanear
    this.scannedValue.set(null);
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  onScan(value: string) {
    if (!value) return;

    this.scannedValue.set(value);
    this.scanSuccessClick.update(v => v + 1);
    this.visible.set(false); // ✅ cierra al detectar
  }
}