const onSignin = (req,res,bcrypt,db)=>{
    const {email, password} = req.body;
    db('login').select('email','hash')
    .where({email})
    .then(data => {
        bcrypt.compare(password, data[0].hash, function(err, result) {
            if(result){
                return db.select('*').from('users').where('email','=',email)
                .then(user => res.json(user[0]))
                .catch(err => res.status(400).json('unable to get user'))
            }
            else{
                res.status(400).json('wrong credentials')
            }
        })
    })
    .catch(err => res.json('wrong credentials'))
}

module.exports = onSignin