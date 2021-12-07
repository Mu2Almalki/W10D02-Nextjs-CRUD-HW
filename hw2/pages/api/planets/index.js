import dbConnect from '../../../Utils/dbConnect'
import Planet from '../../../models/Planet'

dbConnect();

export default async(req,res)=>{
    const {method}= req;

    switch(method){
        case 'GET':
            try{
                const planets=await Planet.find({});

                res.status(200).json({success:true , data:planets})

            }catch (error){
               res.status(400).json({success:false});
            }
            break;
            case 'POST':
                try{
                    const planet =await Planet.create(req.body)
                    const planets=await Planet.find({})
                   res.status(201).json ({success:true , data:planets})

                }catch(error){

                    res.status(400).json({success:false})
                }
                break;
                default:
                    res.status(400).json({success:false})
                    break;
    }
}