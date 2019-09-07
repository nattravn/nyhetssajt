import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let NewsFilterPipe = class NewsFilterPipe {
    transform(news, searchTerm) {
        if (!news || !searchTerm) {
            return news;
        }
        return news.filter(item => item.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1);
    }
};
NewsFilterPipe = tslib_1.__decorate([
    Pipe({
        name: "newsFilter"
    })
], NewsFilterPipe);
export { NewsFilterPipe };
//# sourceMappingURL=news-filter.pipe.js.map