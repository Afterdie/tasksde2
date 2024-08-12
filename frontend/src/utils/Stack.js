export const fetchStacks = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_REACT_URL + '/stacks')
        return response.json()
    } catch (err) {
        throw err
    }
}

export const createStack = async ({ topic, category }) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_REACT_URL + '/createstack',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: topic,
                    category: category,
                }),
            }
        )
        if (!response.ok) throw error
        const data = await response.json()
        return data.id
    } catch (err) {
        throw err
    }
}

export const editStack = async ({ id, topic, category }) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_REACT_URL + '/editstack',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    topic: topic,
                    category: category,
                }),
            }
        )
    } catch (err) {
        throw err
    }
}

export const deleteStack = async (id) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_REACT_URL + '/deletestack',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            }
        )
    } catch (error) {
        return error
    }
}
