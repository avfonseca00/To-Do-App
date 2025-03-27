
export const storeSession = (token: string) => { 
    localStorage.setItem('session', token)
    return true
}

export const getSession = () => { 
    const session = localStorage.getItem('session')
    return session
}