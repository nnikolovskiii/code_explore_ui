import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {CodeProcessService} from '../code-process.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {DocsFilesService} from '../docs-files.service';
@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.css'
})
export class FinishComponent implements OnInit, OnDestroy{
  @Input() url: string = '';
  @Input() type: string = '';
  constructor(
    private codeProcessService: CodeProcessService,
    private docsFilesService: DocsFilesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.url = params['url'] || 'https://github.com/fastapi/fastapi.git';
      this.type = params['type'] || '';
    });
  }

  async completeFinish(){
    if (this.type=="code") {
      firstValueFrom(this.codeProcessService.activate_tmp_files(this.url));
    } else if (this.type == "docs"){
      firstValueFrom(this.docsFilesService.activateTmpFiles(this.url));
    }
    this.router.navigate(['/process-list'],);
  }


  navigateBack() {
    this.location.back();
  }


  ngOnDestroy() {
  }
}
