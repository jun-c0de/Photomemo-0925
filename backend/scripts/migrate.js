const mongoose = require('mongoose')
const Post = require('../models/Posts')
const User = require('../models/User')

(async()=>{
    await mongoose.connect(process.env.MONGO_URI)

    const posts = await Post.find({
        fileUrl:{$type:'string'}
    }).select('_id fileUrl')

    for(const p of posts){
        p.fileUrl = [p.fileUrl].filter(Boolean)
        if(!p.ststus) p.ststus = 'approved'
        await p.save()
    }

    await User.updateMany(
        {rile:{$exists:false}},
        {
            $set:{role:'user',isActive:true},
            $setOnInsert:{failedLoginAttempts:0}
        }
    )
    console.log('migration done')
    process.exit(0)
})