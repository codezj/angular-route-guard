import { Component, Injectable } from "@angular/core";
import {CanActivate,
    ActivatedRouteSnapshot,RouterStateSnapshot,Router, UrlTree, TitleStrategy
} from "@angular/router"

import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";

import { Observable, Subject } from "rxjs";

import { FormComponent } from "./form.component";

@Injectable()
export class UnsavedGuard implements CanActivate{
    constructor(private messages: MessageService, private router: Router){

    }
    canActivate(component: FormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>   {
        if (component.editing){
            if (["name","category","price"]
            .some(prop=> component.product["name"]
                != component.originalProduct["name"]))
                
                {
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


}