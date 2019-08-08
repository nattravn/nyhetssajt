import { Component, OnInit } from '@angular/core';
import { ExpressenService } from 'src/app/shared/expressen.service';

@Component({
  selector: 'app-expressen',
  templateUrl: './expressen.component.html',
  styles: []
})
export class ExpressenComponent implements OnInit {

  constructor(private expressenService: ExpressenService) { }

  ngOnInit() {
  }

}
