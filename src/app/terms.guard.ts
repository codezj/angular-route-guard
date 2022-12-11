import { Injectable } from "@angular/core";
import {CanActivate,
    ActivatedRouteSnapshot,RouterStateSnapshot,Router, UrlTree, TitleStrategy
} from "@angular/router"

import { MessageService } from "./messages/message.service";
import { Message } from "./messages/message.model";
import { TmplAstRecursiveVisitor } from "@angular/compiler";
import { Observable } from "rxjs";

@Injectable()
export class TermsGuard implements CanActivate {
    constructor(private messages: MessageService,
        private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // throw new Error("Method not implemented.");
        if (route.params["mode"] == "create") {
            return new Promise<boolean>((resolve)=>{

                let responses: [string, ()=> void][]
                =[["Yes",()=> resolve(true)], ["No", ()=> resolve(false)]];
    
                this.messages.reportMessage(new Message("Do you accept the terms @ conditions?", false,responses))
            });
        }
        else {
            return true;
        }
    }

    // canActivte(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    // Promise<boolean> | boolean {
    // }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean> | boolean {
        if (route.url.length>0 
            && route.url[route.url.length-1].path == "categories"){
            return new Promise<boolean>((resolve, reject) =>{

                let responses: [string, (string:any)=>void][] = [
                    ["Yes", ()=> resolve(true)],
                    ["No ",()=>resolve(false)]
                ];
                this.messages.reportMessage(
                    new Message("Do you want to see the categories component?", false, responses)
                ) 
            })
        }
        else {
            return true;
        }
    }
}