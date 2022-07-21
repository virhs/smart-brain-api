const onSearch = (req,res,db)=>{
    const { id } = req.params;
    db('users')
    .where({id})
    .select('*')
    .then(user=>{
        if(user.length>0){     //because Boolean([]) returns true so even if we dont get... 
            res.json(user[0]);  //...any result from query so it wont throw error.
        }
        else{
            res.status(400).json('user not found');
        } 
    })
    .catch(err => console.log('error'));
}

module.exports = onSearch;