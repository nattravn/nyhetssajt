import { PipeTransform, Pipe } from '@angular/core';
import { Expressen } from '../shared/expressen.model';

@Pipe({
    name: "newsFilter"
})
export class NewsFilterPipe implements PipeTransform{
    transform(news: Expressen[],  searchTerm:string): Expressen[]{
        if(!news || !searchTerm){
            return news;
        }

        return news.filter(item => 
            item.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1);
    }
}