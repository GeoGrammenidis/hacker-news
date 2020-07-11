const api = "https://hacker-news.firebaseio.com/v0/"
const json = ".json?print=pretty"

export function fetchUser (id) {
    return fetch(`${api}user/${id}${json}`)
        .then((res) => res.json())
}

export function fetchItem (id) {
    return fetch(`${api}item/${id}${json}`)
        .then((res) => res.json())
}

export function stories(storyType) {
    return fetch(`${api}${storyType}stories${json}`)
        .then(res=>res.json())
        .then(ids=>ids.slice(0,50))
        .then(ids=>{
            return Promise.all(ids.map(fetchItem))
        })
        .catch(err=>"some error")
}