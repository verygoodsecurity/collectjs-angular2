import { Component, OnInit } from '@angular/core';

declare const VGSCollect:VGSCollectInterface

interface VGSFormInterface{
  field: (data: string, obj: {}) => {};
  submit: (data: string, obj: {}, func: (status, responce) => void) => VGSFormInterface;
}
interface VGSCollectInterface {
  create: (data: string, func: (state) => void) => VGSFormInterface;
}

@Component({
  selector: 'collect-js',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  secureForm: VGSFormInterface;
  response: string[] = [];
  state: string = '';

  ngOnInit(){
    var vault = 'tntq4dwvhri';
    this.secureForm = VGSCollect.create(vault, (state) => {
      this.state = JSON.stringify(state, null, '\t').trim();
    });
    var field = this.secureForm.field('#cc-name .fake-input', {
      type: 'text',
      name: 'card_name',
      color: '333333',
      placeholder: 'Credit card holder name',
      validations: ['required'],
    });

    this.secureForm.field('#cc-number .fake-input', {
      type: 'card-number',
      name: 'card_number',
      successColor: 'green',
      errorColor: 'red',
      placeholder: 'Credit card number',
      validations: ['required', 'validCardNumber'],
    });

    this.secureForm.field('#cc-cvc .fake-input', {
      type: 'card-security-code',
      name: 'card_cvc',
      placeholder: 'CVC',
      validations: ['required', 'validCardSecurityCode'],
    });

    this.secureForm.field('#cc-expiration-date .fake-input', {
      type: 'card-expiration-date',
      name: 'card_exp',
      placeholder: 'Expiration date',
      validations: ['required', 'validCardExpirationDate']
    });
  }
  submitForm(){
    this.secureForm.submit('/post', {}, 
    (status, response)=> this.response.push(JSON.stringify(response, null, ' ')));
  }
}
