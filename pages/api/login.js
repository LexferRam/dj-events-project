import {API_URL} from '@/config/index';
import cookie from 'cookie'

export default async (req,res) => {
    if(req.method === 'POST'){
        const {identifier, password} = req.body;

        const strapiRes = await fetch(`${API_URL}/auth/local`,{
            method:'POST',
            headers:{ 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({identifier, password})
        })

        const data = await strapiRes.json()

        if (strapiRes.ok) {
            //set cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 27*7,//1 week
                path:'/'
            }))

            res.status(200).json({user:data.user})
        }else{
            res.status(404).json({message:data.error.message})
        }

    }else{
        res.setHeader('Allow', [['POST']])
        res.status(405).json({message:`Method ${req.method} not allowed`})
    }
}