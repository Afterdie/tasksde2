export const fetchStacks = async () => {
    try {
        const response = await fetch('http://localhost:3000/stacks')
        return response.json()
    } catch (err) {
        throw err
    }
}

export const createStack = async ({ topic, category }) => {
    try {
        const response = await fetch('http://localhost:3000/createstack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: topic,
                category: category,
            }),
        })
    } catch (err) {
        throw err
    }
}

export const editStack = async ({ id, topic, category }) => {
    try {
        const response = await fetch('http://localhost:3000/editstack', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                topic: topic,
                category: category,
            }),
        })
    } catch (err) {
        throw err
    }
}

export const deleteStack = async (id) => {
    try {
        const response = await fetch('http://localhost:3000/deletestack', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
    } catch (error) {
        return error
    }
}
