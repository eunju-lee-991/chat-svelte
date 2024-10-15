import { writable, get } from "svelte/store";
import { getApi, putApi, delApi, postApi } from "../service/api.js";
import { setCookie } from "../utils/cookie.js";
import { router } from "tinro";

const setAuth = () => {
    let initValues = {
        id: '',
        email: '',
        name: '',
        Authorization: '',
    }

    const { subscribe, set, update } = writable({ ...initValues })

    const refresh = async () => {
        try {
            const authenticationUser = await postApi({ path: '/auth/access-token' })
            set(authenticationUser)
            isRefresh.set(true)
        }
        catch (err) {
            auth.resetUserInfo()
            isRefresh.set(false)
        }
    } // request access_token by refresh 
    const resetUserInfo = async () => set({ ...initValues })
    const login = async (email, password) => {
        try {
            const options = {
                path: '/members/login',
                data: {
                    email: email,
                    password: password
                }
            }
            const result = await postApi(options)
            set(result)
            isRefresh.set(true)
            setCookie('id', result.id)
            router.goto('/main')
        }
        catch (err) {
            alert('login failed')
        }
    }

    // const logout = async () => {
    //     try {
    //         const options = {
    //             path: '/auth/logout',
    //         }
    //         await delApi(options)
    //         set({...initValues})
    //         isRefresh.set(false)
    //         router.goto('/')
    //     }
    //     catch(err){
    //         alert('logout error')
    //     }
    //  }
    const register = async (name, email, password) => {
        try{
            const options = {
                path: '/members',
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            }

            await postApi(options)
            alert('register success!')
            router.goto('/login')
        }
        catch(err) {
            alert ('regiter failed')
        }
     }

    return {
        subscribe,
        refresh,
        login,
        // logout,
        resetUserInfo,
        register
    }
}

export const auth = setAuth()
export const isRefresh = writable(false)
