import { Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef
} from "@angular/core";

import { Model } from "../model/repository.model";

@Component ({
selector:"paCategoryCount",
template:`
        <div class="bg-primary text-white p-2 ">
            There are {{count}} categories
        </div>`
})

export class ProductCategoryComponent{
private differ: KeyValueDiffer<any, any> | undefined;
count: number = 0;

constructor(private model: Model, private keyValueDiffers: KeyValueDiffers,
        private changeDetector: ChangeDetectorRef){
            
        }

ngOnInit(){
this.differ = this.keyValueDiffers.find(this.model.getProducts())
.create();
}

ngDoCheck(){
if (this.differ != undefined){
    if(this.differ.diff(this.model.getProducts()) != null){
    this.count = this.model.getProducts()
                .map(p => p.category)
                .filter((category, index , array)=> array.indexOf(category) == index).length;    
}

}
}

}