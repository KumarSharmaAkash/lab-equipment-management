import ComponentsDaos, {IComponentModal} from "../daos/ComponentsDaos";
import { IPagination } from "../models/Pagination";

import { IComponents } from "../models/components";

export async function findAllComponents():Promise<IComponentModal[]>{
  return await ComponentsDaos.find();
}

export async function findComponentById(id:string):Promise<IComponentModal>{
    try {
        let component = await ComponentsDaos.findById(id);
        if (component) return component;
 
        throw new Error("the component does not exist");
    } catch (error:any) {
        throw error;
    }
}



export async function modifyComponent(component:IComponentModal):Promise<IComponentModal>{
    try {
        let id = await ComponentsDaos.findOneAndUpdate({
            barcode:component.barcode
        },component,
    {new:true});
    if(id) return component;
    throw new Error("Item Does not Exits")
    } catch (error:any) {
        throw error;
    }
}

export async function registerComponent(component:IComponents):Promise<IComponentModal>{
    const savedComponent= new ComponentsDaos(component);
    return await savedComponent.save();
}

export async function removeComponent(barcode:string):Promise<string>{

    try {
        let id = await ComponentsDaos.findOneAndUpdate({barcode});
        if(id) return "SuccessFully deleted component";

        throw new Error(" component does not exits");
        
    } catch (error:any) {
        throw error;
    }
}


export async function queryComponent(page:number, limit:number,title?:string,barcode?:string,description?:string, value?:string,genre?:string):Promise<IPagination<IComponentModal>>{
    let components:IComponentModal[]= await ComponentsDaos.find();
    let filteredComponent:IComponentModal[]=[];

    components.forEach((component)=>{
        if(barcode){
            if(component.barcode.toLowerCase().includes(barcode.toLowerCase()) && !filteredComponent.some(b=>b["barcode"]===component.barcode) ){
                filteredComponent.push(component);
            }
        }
        if(title){
            if(component.title.toLowerCase().includes(title.toLowerCase()) && !filteredComponent.some(b=>b["barcode"]===component.barcode) ){
                filteredComponent.push(component);
            }
        }
        if(description){
            if(component.description.toLowerCase().includes(description.toLowerCase()) && !filteredComponent.some(b=>b["barcode"]===component.barcode) ){
                filteredComponent.push(component);
            }
        }
        if(value){
            if(component.value.toLowerCase().includes(value.toLowerCase()) && !filteredComponent.some(b=>b["barcode"]===component.barcode) ){
                filteredComponent.push(component);
            }
        }
        if(genre){
            if(component.genre.toLowerCase().includes(genre.toLowerCase()) && !filteredComponent.some(b=>b["barcode"]===component.barcode) ){
                filteredComponent.push(component);
            }
        }
    })

    return PaginateComponent(filteredComponent, page, limit);
}

export function PaginateComponent(components: IComponentModal[],page:number, limit:number):IPagination<IComponentModal>{
    let pageComponents:IComponentModal[]=[];
    const pages= Math.ceil(components.length/Number(limit));

    if(Number(page)===pages){
        const startPoint= (Number(page)-1)*Number(limit);
        pageComponents=components.slice(startPoint);
    }else{
        const startPoint=(Number(page-1))*Number(limit);
        const endPoint = startPoint+Number(limit);
        pageComponents=components.slice(startPoint,endPoint);
    }

    const pageObject={
        totalCount:components.length,
        currentPage:Number(page),
        totalPages:pages,
        limit:Number(limit),
        pageCount:pageComponents.length,
        items: pageComponents
    }
    return pageObject;
}