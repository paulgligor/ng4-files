[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/ng5-files.svg)](https://badge.fury.io/js/ng5-files)
[![Build Status](https://travis-ci.org/bonjurmrfirst/ng5-files.svg?branch=master)](https://travis-ci.org/bonjurmrfirst/ng5-files)

# ng5-files

Upload files by clicking or dragging


## Getting started

`npm i --save ng5-files`

Add following lines into your

**module:**

```typescript
import { Ng5FilesModule } from './ng5-files';
```

add Ng5FilesModule to your module imports section<br/>
```typescript
imports: [ Ng5FilesModule ]
```

<br/>

**component template:**

Upload by click:
```html
<ng5-files-click (filesSelect)="filesSelect($event)">
  <span>Click me to upload</span>
</ng5-files-click>
```

Upload with drag'n'drop:
```html
<ng5-files-drop (filesSelect)="filesSelect($event)">
  <div style="display: inline-block; height: 100px; width: 100px; background-color: gray">
    {{selectedFiles}}
  </div>
</ng5-files-drop>
```

<br/>

**component ts:**
 
```typescript
import {
  Ng5FilesStatus,
  Ng5FilesSelected
} from './ng5-files';
 
...
 
public selectedFiles;
 
public filesSelect(selectedFiles: Ng5FilesSelected): void {
    if (selectedFiles.status !== Ng5FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
      
      // Hnadle error statuses here
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  }

```

##Configure

To pass config to ng5-files add following lines to you component.ts file:

### Shared Config

```typescript
import {
  Ng5FilesService,
  Ng5FilesConfig,
} from './ng5-files';
 
...
 
constructor(
      private ng5FilesService: Ng5FilesService
  ) {}
 
private testConfig: Ng5FilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };
   
ngOnInit() {
    this.ng5FilesService.addConfig(this.testConfig);
}
```

### Private configs

Config added this way <br>
`this.ng5FilesService.addConfig(this.testConfig);`<br>
is shared config. All components will use it.

But you can add multiple configs for your upload components.<br>
Let's say, you have two upload components and you want to allow user upload just one video and 5(max) images.<br>
To do this create 2 configs and pass it to upload components as named configs.

.ts

```typescript
import {
  Ng5FilesService,
  Ng5FilesConfig,
  Ng5FilesStatus,
  Ng5FilesSelected
} from './ng5-files';
 
 ...
 
public selectedFiles; 
 
private configImage: Ng5FilesConfig = {
    acceptExtensions: ['jpg', 'jpeg'],
    maxFilesCount: 5,
    totalFilesSize: 101200000
  };
  
private configVideo: Ng5FilesConfig = {
    acceptExtensions: ['mp4', 'avi'],
    maxFilesCount: 1
  };  
 
constructor(
      private ng5FilesService: Ng5FilesService
  ) {}

  ngOnInit() {
    this.ng5FilesService.addConfig(this.configImage, 'my-image-config');
    this.ng5FilesService.addConfig(this.configVideo, 'my-video-config');
  }

  public filesSelect(selectedFiles: Ng5FilesSelected): void {
    if (selectedFiles.status !== Ng5FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }
 
    // Handle error statuses here
 
    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  } 
 
```

.html

```html
<ng5-files-click (filesSelect)="filesSelect($event)" [configId]="'my-image-config'">
  <span>Upload</span>
</ng5-files-click>
 

<ng5-files-drop (filesSelect)="filesSelect($event)" [configId]="'my-video-config'">
  <div style="display: inline-block; height: 100px; width: 100px; background-color: gray">
    {{selectedFiles}}
  </div>
</ng5-files-drop>
```  
  
  
## API

### Config

_acceptExtensions_ <br/>
values: string[] or \'\*\' <br/>
examples: ['ts', 'spec.ts'], ['js'], '*'

_maxFilesCount_: <br/>
values: [number] <br/>

_maxFileSize:_ <br/>
values: [number] (bytes)
 
_totalFilesSize:_ <br/>
values: [number] (bytes)

### Template

<ng5-files-click _(filesSelect)_="YOUR_HANDLER($event)" _[configId]_="YOUR_CONFIG">

_filesSelect_<br> 
emit when files attached and pass Ng5FilesSelected object to YOUR_HANDLER:

```
export enum Ng5FilesStatus {
    STATUS_SUCCESS,
    STATUS_MAX_FILES_COUNT_EXCEED,
    STATUS_MAX_FILE_SIZE_EXCEED,
    STATUS_MAX_FILES_TOTAL_SIZE_EXCEED,
    STATUS_NOT_MATCH_EXTENSIONS
}

export interface Ng5FilesSelected {
  status: Ng5FilesStatus;
  files: File[];
}
```

_! Note on statuses STATUS_MAX_FILE_SIZE_EXCEED or STATUS_NOT_MATCH_EXTENSIONS you get files not passed validation, so you shouldn't filter it manually to find all invalid files._

_configId_<br>
Pass your named config with configId
<br>

## Caveat
Please don't use button tag in template inside ng5-files-click<br>
Don't: ```html
<ng5-files-click>
    <button></button>
</ng5-files-click>```
<br><br>
ng5-files-click content is wrapped in label tag, so prefer something like
````html
<ng5-files-click>
    <span role="button" style="btn">Give me file ^.^</button>
</ng5-files-click>```
````
