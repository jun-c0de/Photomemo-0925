const mongoose=require('mongoose')

const AuditLogScheam = new mongoose.Schema({
    actor:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    role:String,

    resource:{
        type:String,
        enum:['post','user','file','report','setting']
    },
    action:{
        type:String,
        enum:['create','update','delete','approve','reject','hide']
    },
    targetId:{
        type:String
    },
    diff:Object,
    ip:String,
    ua:String
},{
    timestamps:true
})

AuditLogScheam.index({createdAt:-1})

AuditLogScheam.index({resource:1,action:1,createdAt:-1})

module.exports=mongoose.model('AuditLog',AuditLogScheam)
