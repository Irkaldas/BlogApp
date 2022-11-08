import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  constructor() { }

  public Editor = ClassicEditor;


  public config = {

    placeholder: 'Write your article here!'
  }

  ngOnInit(): void {
  }

}
