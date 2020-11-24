import jwt from 'jsonwebtoken';

const generateToken = (data)=>{
    const token = jwt.sign(data, 'secretKey');
    return token;
};

const verifyToken = (token)=>{
    const decoded = jwt.verify(token, 'secretKey');
    return decoded;
}

export { generateToken, verifyToken};
