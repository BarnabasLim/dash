
import { ChangeDetectorRef, Component } from '@angular/core';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public _cd:ChangeDetectorRef
  ){
  }
  title = 'dash';

  toggle_base64_icon=true;
  toggle_svg_icon=true;
  toggle_other_url_icon=true;
  toggle_path_icon=true;
  toggle_base64_svg_icon=true;
  toggle_base64_svg_link_icon=true
  console_val=""

  public saveAsPdf=(type:string='normal')=>{
    this.console_val=""
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

    
    switch (type){
      case 'normal':
        html2pdf().set(options).from(new_document.documentElement).save().catch((e)=>{
            setTimeout(()=>{
              this.console_val+=e
              this._cd.detectChanges()
            },200)
          }
        )
        break;
      case 'dataURL':
        html2pdf().set(options).from(new_document.documentElement).toPdf().get('pdf').then((pdf)=>{
          let blobPDF=new Blob([pdf.output('blob')],{type:'application/octet-stream'})
          let reader=new FileReader();
          reader.readAsDataURL(blobPDF);
          reader.onloadend=()=>{
            let base64data=reader.result;
            this.console_val+="using data url: "+ base64data+"/n"
            let anchor=document.createElement('a');
            anchor.href=""+base64data;
            anchor.target="_blank";
            anchor.download=options.filename+'.pdf';
            anchor.click();
            anchor.remove();
            this._cd.detectChanges()
          }
    
        }).catch((e)=>{
          setTimeout(()=>{
            this.console_val+=e
            this._cd.detectChanges()
          },200)
        })
        break;
    }


  }
}
