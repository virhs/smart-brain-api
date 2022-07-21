const onRegister = (req,res,bcrypt,db)=>{
    const { email, name, password } = req.body;
    if(email.length==0 || password.length==0) return res.status(400).json('error')
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.transaction(trx => {          //use knex.js transaction as multiple dependent operations are performed
                trx.insert({                 //insertion of hash in login and then into users table
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0].email,
                        joined: new Date()
                    })
                    .then(user=>res.json(user[0]))
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err => res.status(400).json('unable to register'));
        });
    });
}

module.exports = onRegister