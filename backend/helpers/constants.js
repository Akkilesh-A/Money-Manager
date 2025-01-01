const success=(message, data=null, error=null)=>{
    return {
        status:"success",
        message:message,
        data:data,
        error:error
    }
}

const error=(message, data=null, error=null)=>{
    return {
        status:"error",
        message:message,
        data:data,
        error:error
    }
}

const info=(message, data=null, error=null)=>{
    return {
        status:"info",
        message:message,
        data:data,
        error:error
    }
}

export const responseJSON={
    success,
    error,
    info
}

export const saltRounds = 12;
export const signJWT=(id)=>{
    const jwtToken = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return jwtToken
}