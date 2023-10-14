import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VenderRateService } from '../vender-rate.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  apiUrl = 'https://venderproject-258bb-default-rtdb.firebaseio.com//upload.json'

  form: FormGroup|any;
  isEditing = false;
  formData: any[]=[];
  editBtn : boolean = false;
  isNewVender =false;
  selectedFile: File | any;
  dataToExport : any[] = [];
  fileName = 'ExcelSheet.xlsx'

  saveBtn = document.querySelector('saveButton');  
  
  constructor(private fb: FormBuilder, public vendorRateService: VenderRateService, private http : HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      vendor: ['', Validators.required],
      rateCard: ['', Validators.required],
      rate: [0, Validators.required],
      project: ['', Validators.required],
      status: ['Save', Validators.required],
      budgetHrs: ['', Validators.required],
      remarks: ['', Validators.required],
      file : ['', Validators.required]
    });

    this.vendorRateService.formData$.subscribe((formData) => {
      this.formData = formData;
      console.log(this.formData);
    });

   
    this.form.get('vendor').valueChanges.subscribe((vendor: string) => {
      this.vendorRateService.getRateCards(vendor);
    });

      const rateCardControl = this.form.get('rateCard').valueChanges.subscribe((rateData:any)=>{
        this.vendorRateService.getRate(rateData)
      });

    this.vendorRateService.rateCards2$.subscribe((data:any)=>{
      const rateCardControl2 = this.form.get('rate');
      rateCardControl2.setValue(data[0]);
    })

     this.dataToExport = [
      {
        date: '25 dec',
        vendor: "HCL",
        rateCard: 'Rate Card4',
        rate: 50,
        project: 'venders project',
        status: 'submit',
        budgetHrs: '78',
        remarks:'B' ,
      },
      {
        date: this.form.value.date,
        vendor: this.form.value.vender,
        rateCard: this.form.value.rateCard,
        rate: this.form.value.rate,
        project: this.form.value.project,
        status: this.form.value.status,
        budgetHrs: this.form.value.budgetHrs,
        remarks:this.form.value.remarks ,
      },
    ];
  }


  onEditClick(){
    console.log('click', this.formData);
    this.formData.filter((item)=>{
        this.form.patchValue(item);  
        this.isEditing = true;
        this.isNewVender = false;             
    })
    }
    
  onSubmit(): void {  
    this.isEditing = false;
    console.log(this.form.value);
    const formData = this.form.value;
    this.vendorRateService.setFormData(formData);
    this.form.reset();
  }  


  save(){   
      this.isEditing = true;
    
      this.form.reset();
    }
  
   
    viewBtn(){
      alert('you can only view data');
      this.isEditing = false;
    }
    cancel() {
      this.form.reset(); 
      this.isEditing = false;
    }

    onFileSelected(event:any) {
      if(!this.form.value.file){
        this.selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file',this.selectedFile); 
      this.http.post<any>(this.apiUrl, formData).subscribe((data:any)=>{
        console.log(data)
      })
      }
    } 

  exportToExcel(): void {
    let element = document.getElementById('excel-table')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

}