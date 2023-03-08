import React from 'react'
import { createContext, useReducer } from 'react'
import githubtReducer from './GithubReducer';


const GithubContext = createContext();

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        loading: false,
        user: {},
        repos: []
    }

    const [state, dispatch] = useReducer(githubtReducer, initialState)

    // Get Single User 
    const getUser = async (login) => {
        setLoading()
        const URL = 'https://api.github.com';

        const response = await fetch(`${URL}/users/${login}`)
        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json();
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }
    // Get User Repos 
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams ({
            sort: 'created',
            per_page: 10
        })

        const URL = 'https://api.github.com';

        const response = await fetch(`${URL}/users/${login}/repos?${params}`)
        const data = await response.json();

        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }

    const setLoading = () => dispatch({type: 'SET_LOADING'})
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

    return <GithubContext.Provider value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext