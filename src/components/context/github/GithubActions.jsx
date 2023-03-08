export const searchUsers = async (text) => {
    const params = new URLSearchParams ({
        q: text,
    })
    const URL = 'https://api.github.com';

    const response = await fetch(`${URL}/search/users?${params}`)
    const {items} = await response.json();

    return items
}