import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable ,of} from "rxjs";
import { Model } from "./repository.model";
import { RestDataSource } from "./rest.datasource";
import { Product } from "./product.model";
import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";
import { delay } from 'rxjs/operators';


@Injectable()


// export class NewsResolver implements Resolve<Observable<string>> {
//     resolve(): Observable<string> {
//       return of('Route!').pipe(delay(2000));
//     }


export class ModelResolver implements  Resolve<Observable<Product[]>>{
    constructor(
        private model:Model,
        private dataSource: RestDataSource,
        private messages: MessageService

    ){

    }

    resolve(): Observable<Product[]> {
        if(this.model.getProducts().length == 0){
            this.messages.reportMessage(new Message("Loading data...."));
            return this.dataSource.getData();
        }
        else{
            return this.dataSource.getData()
        }


       
      }


//     resolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {

//         // return this.model.getProducts().length == 0 ?
//         // this.dataSource.getData(): null;



//         if(this.model.getProducts().length == 0){
//             this.messages.reportMessage(new Message("Loading data...."));
//             return this.dataSource.getData();
//         }
//         else{
//             return this.dataSource.getData()
//         }
    
//     }
}