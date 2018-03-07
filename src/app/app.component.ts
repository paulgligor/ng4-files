import {Component, OnInit} from '@angular/core';

import {
  Ng5FilesService,
  Ng5FilesConfig,
  Ng5FilesStatus,
  Ng5FilesSelected
} from './ng5-files';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public selectedFiles;

  private sharedConfig: Ng5FilesConfig = {
    acceptExtensions: ['jpg'],
    maxFilesCount: 5
  };

  private namedConfig: Ng5FilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 512000,
    totalFilesSize: 1012000
  };

  constructor(
      private ng5FilesService: Ng5FilesService
  ) {}

  ngOnInit() {
    this.ng5FilesService.addConfig(this.sharedConfig);
    this.ng5FilesService.addConfig(this.namedConfig, 'another-config');
  }

  public filesSelect(selectedFiles: Ng5FilesSelected): void {
    if (selectedFiles.status !== Ng5FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  }

}
