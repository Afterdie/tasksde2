export const fetchCards = async (id) => {
    try {
        const url = new URL(import.meta.env.VITE_REACT_URL + '/cards')
        url.searchParams.append('id', id.toString())
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}

export const createCard = async (cardDetails) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_REACT_URL + '/createcard',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardDetails),
            }
        )
        if (!response.ok) throw error
        const data = await response.json()
        return data.id
    } catch (error) {
        return error
    }
}

export const editCard = async ({ question, answer, id, stack_id }) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_REACT_URL + '/editcard',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    stack_id: stack_id,
                    question: question,
                    answer: answer,
                }),
            }
        )
    } catch (error) {
        return error
    }
}

export const deleteCard = async (id, stack_id) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_REACT_URL + '/deletecard',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, stack_id: stack_id }),
            }
        )
    } catch (error) {
        return error
    }
}
