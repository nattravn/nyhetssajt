import { Injectable } from '@angular/core';
import { Custom } from './custom.model';

@Injectable({
  providedIn: 'root'
})
export class RssConverterService {
  cystomModel: Custom = new Custom();
  constructor() { }

  convert(rssItem, clickedSource): Custom {

    const feed = new Custom();
    console.log('rssItem: ', rssItem);
    console.log('clickedSource.name: ', clickedSource.name);
    if (clickedSource.name === 'Dn' && rssItem.enclosure.link) {
      feed.ImageURL = rssItem.enclosure.link;
      rssItem.description = '<img src=' + feed.ImageURL + ' width="300px"/>' + '<p>' + rssItem.description + '</p>';
    } else {
      feed.ImageURL = rssItem.thumbnail;
    }

    feed.category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
    feed.pubDate = rssItem.pubDate;
    feed.description =  rssItem.description;
    feed.link = rssItem.link;
    feed.id = 0;
    feed.title = rssItem.title;
    feed.source = clickedSource.name;
    feed.rss = clickedSource.rss;
    feed.info = clickedSource.info;

    return feed;
  }
}
