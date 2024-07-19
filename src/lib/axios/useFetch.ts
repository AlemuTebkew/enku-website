import { useState, useEffect } from 'react'
import axiosInstance from './axiosInstance'

interface UseFetchResult<T> {
    data: T | null,
    error: Error | null,
    loading: boolean
}

const useFetch = <T,>(url: string): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get<T>(url)
                setData(response.data)
            }catch(error) {
                setError(error as Error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { data, error, loading }
}

export default useFetch