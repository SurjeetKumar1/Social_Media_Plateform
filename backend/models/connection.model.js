import mongoose, { mongo } from "mongoose";

const conntionRequestSchema=new mongoose.Schema({
    userId:{                                 //kisne bheja
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
    },
    connectionId:{                           //kisko bheja 
       type:mongoose.Schema.Types.ObjectId,
   ref:"User"
    },
    status_Accepted:{             //acceptd,rejected,wait 
      type:Boolean,
      default:null
    },
})

const ConntionRequest=mongoose.model("ConntionRequest",conntionRequestSchema);
export default ConntionRequest;