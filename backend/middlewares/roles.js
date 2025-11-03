export.requireRole=(role)=>(req,res,next)=>{
    const r = req.user?.role

    if(r===role) return next()

    return res.status(404).json({message:'관리가 권한 필요'})
}