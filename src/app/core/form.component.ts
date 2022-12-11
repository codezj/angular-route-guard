import { Component ,Inject,inject} from "@angular/core";
import { NgForm } from "@angular/forms";

import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
// import { filter,map,distinctUntilChanged,skipWhile } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "paForm",
    templateUrl: "from.component.html",
    styleUrls: ["from.component.css"]
})

export class FormComponent{
    product: Product = new Product();
    originalProduct = new Product();
    //lastId: number | undefined;
    router: any;
    editing: boolean = false;
    constructor(public model: Model, 
        // @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
        activateRoute: ActivatedRoute,
        router: Router
        )
        {
            
            
            
            this.router = router;
            
            
            activateRoute.params.subscribe(params => {
                
                this.editing = activateRoute.snapshot.params["mode"] == "edit";
                let id = +params["id"];
                if (id != null){
                    Object.assign(this.product, model.getProduct(id) || new Product())
                    // this.originalProduct = this.product
                    this.originalProduct = structuredClone(this.product)
                    console.log(this.originalProduct, this.product,'.....');
                }

            })
            // this.router = router;
            // this.editing = activateRoute.snapshot.params["mode"] == "edit";
            // // console.log(activateRoute.snapshot.params["mode"],'test',activateRoute.snapshot.params["id"]);
          
            
            // let id = +activateRoute.snapshot.params["id"];
            // if (id != null){
            //     Object.assign(this.product, model.getProduct(id) || new Product())
            // }
            // if (id != null) {
            //     let name = activateRoute.snapshot.params["name"];
            //     let category = activateRoute.snapshot.params["category"];
            //     let price = activateRoute.snapshot.params["price"];

            //     if (name !=null && category !=null && price != null){
            //         this.product.id = id;
            //         this.product.name = name;
            //         this.product.category = category;
            //         this.product.price = Number.parseFloat(price);
            //     }
            //     else {

            //         Object.assign(this.product, model.getProduct(id) || new Product())
            //     }
                // this.product = model.getProduct(id);
                
            }
           
            
            // console.log(stateEvents,'stateEvents');
            
            
            // stateEvents
            // .pipe(map(state => new SharedState(state.mode, state.id == 5 ? 1 : state.id)))
            // // .pipe(map(state => state.mode == MODES.EDIT? state.id  : -1))
            // // .pipe(skipWhile(state => state.mode == MODES.EDIT))
            // // .pipe(distinctUntilChanged((firstState, secondState) =>
            // // firstState.mode == secondState.mode && firstState.id == secondState.id))
            // // .pipe(filter(id => id !=3 ))
            // .subscribe((update) =>{
             
                
            //     // this.editing = id != -1
            //     this.product = new Product()
            //     if(update.id != undefined) {
            //         Object.assign(this.product, this.model.getProduct(update.id));
            //     }

            //     this.editing = update.mode == MODES.EDIT;
            // });
        


    // get editing(): boolean {
    //     return this.state.mode == MODES.EDIT;
    // }

    submitForm(form: NgForm){
        
        
        
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.originalProduct = this.product;
            // console.log('fffffffffff',this.originalProduct,this.product);
            
            // this.product = new Product();
            // form.reset()
            this.router.navigateByUrl("/")
            console.log(this.router,'router');
            
        }
    }

    // resetForm(){
    //     this.product = new Product();
    // }

    // ngDoCheck(){
    //     if (this.lastId != this.state.id){
    //         this.product = new Product();
    //         if (this.state.mode == MODES.EDIT){
    //             Object.assign(this.product, this.model.getProduct(this.state.id));
    //         }
    //         this.lastId = this.state.id;
    //     }
    // }
}