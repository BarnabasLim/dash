import { Component } from '@angular/core';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
  ){

  }
  title = 'dash';

  toggle_base64_icon=true;
  toggle_svg_icon=true;
  toggle_other_url_icon=true;


  public saveAsPdf=()=>{
    let new_document:Document=document.cloneNode(true) as Document;
    new_document.body.innerHTML=""
    new_document.body.innerHTML=document.body.innerHTML;
    let options={
      margin:0,
      filename:'James',
      imag:{type:"jpeg", quality:0.98},
      html2canvas:{
        scale:2,
        foreignObjectRendering:false,
        imageTimout:99,
        useCORS:true,
        allowTaint:true,
        width:800,
        x:0,
        scrollX:0,
        scrollY:0,
        windowWidth:2560
      },
      jsPDF:{unit:'mm', format:'a4', orientation:'portrait'},
      pagebreak:{mod:'css'}
    }
    const date=moment().format("DDMMYYHHmmss")
    options.filename=`Session_${date}.pdf`
    let required_width=(document.body.getBoundingClientRect().height+150)*210/297
    options.html2canvas.width=required_width;
    new_document.body.style.width=required_width-40+"px";
    new_document.body.style.borderStyle='solid'
    console.log(options)

    html2pdf().set(options).from(new_document.documentElement).save()
  }
}
