import { Component ,Inject } from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observer } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "paTable",
    templateUrl: "table.component.html"
})

export class TableComponent {

    category: any
    constructor(private model: Model, 
        activateRoute: ActivatedRoute
        // @Inject(SHARED_STATE) public observer: Observer<SharedState>
        ){

            activateRoute.params.subscribe(params => {
                this.category = params["category"] || null
            })

        }




    getProduct(key: number): Product{
        return this.model.getProduct(key);
    }

    getProducts(): Product[] {
        return this.model.getProducts()
        .filter(p => this.category == null || p.category == this.category);
    }

    get categories(): (string| undefined)[] {
        return this.model.getProducts()
                .map(p=>p.category)
                .filter((catetory, index, array)=> array.indexOf(catetory) == index);
    }
    // getProducts(): Product[] {
    //     return this.model.getProducts();
    // }

    deleteProduct(key: number | undefined) {
        
        this.model.deleteProduct(key)
    } 

    // editProduct(key: number | undefined) {
    //     console.log(key,new SharedState(MODES.EDIT, key));
        
    //     this.observer.next(new SharedState(MODES.EDIT, key))
        
     
    // }

    // createProduct(){
    //     this.observer.next(new SharedState(MODES.CREATE));
    // }

}