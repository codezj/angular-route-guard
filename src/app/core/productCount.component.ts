import { Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef
        } from "@angular/core";

import { Model } from "../model/repository.model";
import { ActivatedRoute } from "@angular/router";

@Component ({
    selector:"paProductCount",
    template:`
                <div class="bg-info text-white p-2 ">
                    There are {{count}} products
                </div>`
})

export class ProductCountComponent{
    private differ: KeyValueDiffer<any, any> | undefined;
    count: number = 0;
    private category: string | undefined;

    constructor(private model: Model, private keyValueDiffers: KeyValueDiffers,
                private changeDetector: ChangeDetectorRef,
                activateRoute: ActivatedRoute
                ){

                    // activateRoute.pathFromRoot.forEach(route => console.log(route.params.subscribe(pa=>{console.log(pa);
                    // }),'gggggggggggg'));
                    
                            
                    
                    
                }

    ngOnInit(){
        this.differ = this.keyValueDiffers.find(this.model.getProducts())
        .create();
    }

    ngDoCheck(){
        if (this.differ != undefined){
            if(this.differ.diff(this.model.getProducts()) != null){
                this.updateCount();
        }
        
        }
    }
    private updateCount(){
        // console.log(this.model.getProducts().length,'....');
        
        this.count = this.model.getProducts()
                        .filter(p => this.category == null || p.category == this.category).length;
    }
}


// constructor(private model: Model, private keyValueDiffers: KeyValueDiffers,
//     private changeDetector: ChangeDetectorRef,
//     activateRoute: ActivatedRoute
//     ){

//         activateRoute.pathFromRoot.forEach(route => route.params.subscribe(params=>{
//             if (params["category"] != null) {
//                 this.category = params["category"];
//                 this.updateCount();
//             }
//         })     
//     }

