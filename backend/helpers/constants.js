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

export const responseJSON={
    success,
    error
}