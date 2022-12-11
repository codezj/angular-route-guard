import { NgModule } from "@angular/core";
import { BrowserModule
 } from "@angular/platform-browser";
 import {FormsModule} from "@angular/forms"
 import { ModelModule } from "../model/model.module";
 import { TableComponent } from "./table.component";
 import { FormComponent } from "./form.component";
//  import { SharedState, SHARED_STATE } from "./sharedState.model";
// import { Model } from "../model/repository.model";
import { Subject } from "rxjs";
import { StatePipe } from "./state.pipe";
import { MessageModule } from "../messages/message.module";
import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";
import { Model } from "../model/repository.model";
// import { MODES } from "./sharedState.model";
import { RouterModule } from "@angular/router";
import { ProductCategoryComponent } from "./categoryCount.component";
import { ProductCountComponent } from "./productCount.component";
import { NotFoundComponent } from "./notFound.component";
import { UnsavedGuard } from "./unsaved.guard";


 @NgModule({
    imports: [BrowserModule, FormsModule, ModelModule, MessageModule, RouterModule],
    declarations: [TableComponent, FormComponent, StatePipe,ProductCategoryComponent,
                  ProductCountComponent,NotFoundComponent],
    providers: [UnsavedGuard],
    exports: [ModelModule, TableComponent, FormComponent],
   //  providers: [{
   //          provide: SHARED_STATE,
   //          deps:[MessageService, Model],
   //          useFactory: (MessageService : any, model: any) =>{
   //             return new Subject<SharedState>;
   //             // let subject = new Subject<SharedState>;
   //             // subject.subscribe(m => MessageService.reportMessage(
   //             //    new Message(MODES[m.mode] + (m.id != undefined 
   //             //       ? ` ${model.getProduct(m.id).name}` :""))
   //             // ));

   //             // return subject;
   //          }


      
   //    // useValue: new Subject<SharedState>()
   
   // }]
 })

 export class CoreModule {}