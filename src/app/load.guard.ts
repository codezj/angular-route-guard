import { Injectable } from "@angular/core";
import {CanLoad, 
     Route, Router, UrlSegment, UrlTree
} from "@angular/router"

import { MessageService } from "./messages/message.service";
import { Message } from "./messages/message.model";

import { Observable } from "rxjs";

@Injectable()
export class LoadGuard implements CanLoad {

    private loaded: boolean = false;

    constructor(private messages: MessageService,
        private router: Router){}
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.loaded || new Promise<boolean>((resolve, reject) =>{
            let responses: [string, (string: any) => void][] = [

                ["Yes", ()=>{
                    this.loaded = true;
                    resolve(true)
                }],
                ["No",()=>{
                    this.router.navigateByUrl(this.router.url);
                    resolve(false);
                }]
            ];

            this.messages.reportMessage(new Message("Do you want to load the module", false, responses))
        })
    }

}