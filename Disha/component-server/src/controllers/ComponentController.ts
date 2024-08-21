import { Request, Response } from "express";
import { findAllComponents, registerComponent, modifyComponent, removeComponent, queryComponent } from "../services/ComponentServices";


async function getAllComponents(req:Request, res:Response){
    try {
        let components= await findAllComponents();
        res.status(200).json({
            message: "Retrieved all books", count:components.length, components});
        
    } catch (error:any) {
        res.status(500).json({
            message:"Unable to retrieve components at this time"
        });
        
    }
}
async function CreateComponent(req:Request, res:Response){
    let component= req.body;
    
    try {
        

        console.log('Received Payload:', component);
        let savedComponent= await registerComponent(component);
        console.log(savedComponent)
        res.status(201).json({
            message: "Component created successfully", savedComponent});
        
    } catch (error:any) {
        res.status(500).json({
            message:"Unable to save components at this time"
        });
        
    }
}
async function updateComponent(req:Request, res:Response){
    let component= req.body;
    try {
        let updateComponent= await modifyComponent(component);
        res.status(202).json({
            message: "Component updated successfully", updateComponent});
        
    } catch (error:any) {
        res.status(500).json({
            message:"Unable to update components at this time"
        });
        
    }
}
async function deleteComponent(req:Request, res:Response){
    let {barcode}= req.params;
    try {
        let message = await removeComponent(barcode);
        res.status(202).json({
            message});
        
    } catch (error:any) {
        res.status(500).json({
            message:"Unable to delete components at this time"
        });
        
    }
}


async function SearchForComponentByQuery(req: Request, res: Response) {
    const { title, barcode, description, value, genre,page = 1,limit = 10 } = req.query;

        const components = await queryComponent(
            Number(page),
            Number(limit),
            title as string,
            barcode as string,
            description as string,
            value as string,
            genre as string
        );

        res.status(200).json({message: "Retrieved components from query",page:components });
}

export default{ getAllComponents,CreateComponent, updateComponent, deleteComponent,SearchForComponentByQuery};