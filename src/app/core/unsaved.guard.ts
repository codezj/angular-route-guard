import { Component, Injectable } from "@angular/core";
import {CanDeactivate,
    ActivatedRouteSnapshot,RouterStateSnapshot,Router, UrlTree, TitleStrategy
} from "@angular/router"

import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";

import { Observable, Subject } from "rxjs";

import { FormComponent } from "./form.component";




@Injectable()
export class UnsavedGuard implements CanDeactivate<FormComponent>{
    constructor(private messages: MessageService, private router: Router){

        
        
    }
    canDeactivate(component: FormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // throw new Error("Method not implemented.");
        if (component.editing){
            if (
                // ["name","category","price"]
                ["name"]
            .some(prop=> 
                component.product["name"]!= component.originalProduct["name"] 
                ||
                component.product["category"]!= component.originalProduct["category"] 
                ||
                component.product["price"]!= component.originalProduct["price"] 
                
                ))
                
                
                {
                    console.log(component.product["name"],component.originalProduct,'oppppppp');
                    console.log(component.product["category"],component.originalProduct["category"]);
                    console.log(component.product["price"],component.originalProduct["price"]);
                    
                    let subject = new Subject<boolean>();

                    let responses : [string, (string: any )=> void][] =[
                        ["Yes", () => {
                            subject.next(true);
                            subject.complete();
                        }],
                        ["No", ()=>{
                            this.router.navigateByUrl(this.router.url);
                            subject.next(false);
                            subject.complete();
                        }

                        ]
                    ];
                    this.messages.reportMessage(
                        new Message("Discard Changes?",
                    true, responses));
                    return subject;
                }
                // else {
                //     return true;
                // }
        }
        return true;
    }
    // canDeActivate(component: FormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanComponentDeactivate  {
    //     if (component.editing){
    //         if (["name","category","price"]
    //         .some(prop=> component.product["name"]
    //             != component.originalProduct["name"]))
                
    //             {
    //                 let subject = new Subject<boolean>();

    //                 let responses : [string, (string: any )=> void][] =[
    //                     ["Yes", () => {
    //                         subject.next(true);
    //                         subject.complete();
    //                     }],
    //                     ["No", ()=>{
    //                         this.router.navigateByUrl(this.router.url);
    //                         subject.next(false);
    //                         subject.complete();
    //                     }

    //                     ]
    //                 ];
    //                 this.messages.reportMessage(
    //                     new Message("Discard Changes?",
    //                 true, responses));
    //                 return subject;
    //             }
    //             // else {
    //             //     return true;
    //             // }
    //     }
    //     return true;
    // }
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //     // throw new Error("Method not implemented.");
    //     if (route.params["mode"] == "create") {
    //         return new Promise<boolean>((resolve)=>{

    //             let responses: [string, ()=> void][]
    //             =[["Yes",()=> resolve(true)], ["No", ()=> resolve(false)]];
    
    //             this.messages.reportMessage(new Message("Do you accept the terms @ conditions?", false,responses))
    //         });
    //     }
    //     else {
    //         return true;
    //     }
    // }

}