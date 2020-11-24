import bcrypt from 'bcrypt';

const hashpassword = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const comparePassord = ( password,hashedPassword)=>{

    return bcrypt.compareSync(password, hashedPassword); 

}

export { hashpassword, comparePassord };