import { Component } from "../../../models/Component"; 
import { PageInfo } from "../../../models/Page";


export function generateRandomcompToDisplay():string[]{
    let choices=["Diode", "Register","Capacitor"];
    let chosen:string[]=[];

    while(chosen.length!==1){
        let num= Math.floor(Math.random()*2);
        if(!chosen.includes(choices[num]))chosen.push(choices[num]);
    }
    return chosen;
}

export function getRandomCompByTitle(genre:string,components:Component[]):Component[]{
    let FilteredComponents= components.filter((component)=>component.genre===genre);
    let randomComponent: Component[]=[];

    if(FilteredComponents.length < 10) return FilteredComponents;

    while(randomComponent.length !==10){
        let index = Math.floor(Math.random()*FilteredComponents.length);
        if(!randomComponent.some(b=>b['barcode']===FilteredComponents[index].barcode)) randomComponent.push(FilteredComponents[index]);
    }

    return randomComponent;
}

export function calculatePaging(pageInfo:PageInfo):string[]{
    let pArr:string[]=[];
    if(pageInfo){
        let total=pageInfo?.totalPage;
        let current= pageInfo?.currentPage;

        if(total<=10){
            for(let i=1; i<=total; i++){
                pArr.push(`${i}`);
            }
        }else if(total >10 && current-7 <=0){
            for(let i=1; i<=8; i++){
                pArr.push(`${i}`);
            }

            pArr.push('...');
            for(let i=total-1; i<=total; i++){
                pArr.push(`${i}`);
            }
        }else if(total > 10 && total-7>0 && total-current >5){
            for(let i=1; i<=2; i++){
                pArr.push(`${i}`);
            }

            pArr.push('...');
            for(let i= current; i<=current+4; i++){
                pArr.push(`${i}`);
            }
            pArr.push('...');
            for(let i= total-1; i<=total; i++){
                pArr.push(`${i}`);
            }

        }else{
            for(let i=1; i<=2; i++){
                pArr.push(`${i}`);
               
            }
            pArr.push('...');
            for(let i= total-5; i<=total; i++){
                pArr.push(`${i}`);
            }
        }
    }
    return pArr;
}