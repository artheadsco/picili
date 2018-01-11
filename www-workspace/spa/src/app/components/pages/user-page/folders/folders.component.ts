import { HelperService } from './../../../../services/helper.service';
import { Component, OnInit, Input } from '@angular/core';
import { SearchService, HttpService } from './../../../../services';

import { GlobalVars } from './../../../../../env';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html'
})
export class FoldersComponent implements OnInit {
    
    private aFolders: any[] = [];

    constructor(
        private searchService: SearchService,
        private httpService: HttpService,
        private gbl: GlobalVars,
        private helperService: HelperService
    ) {
        this.httpService.bSearchingChanged.subscribe(bSearching => {
            if (bSearching) {
                // a search has begun.
                this.aFolders = [];
            } else {
                // a search has ended
                if (this.searchService.mData.search.aggs) {
                    this.aFolders = this.searchService.mData.search.aggs;
                }
            }
        });
    }

    @Input() aggs;
    @Input() results;

    ngOnInit() {
    }

    addFolder(sDisplay, sValue)
    {
        sDisplay = sValue.split("/").pop(-1);
        this.searchService.addFilter('folder', sDisplay, sValue);

        this.httpService.triggerSearch();
    }

}
