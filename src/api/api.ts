import axios from 'axios'
import type { TDataCollection } from '../types/data'

// import data from '../test-data.json'
import { testData as data } from './vercel-test-data'

//const defaultUrl = ''

export const getData = async (): Promise<TDataCollection> => {
	try {
		const response = await axios.get<TDataCollection>('../test-data.json')
		if (!response.data) {
			throw new Error('No data received')
		}
		return data as any
	} catch (error) {
		console.error('API Error:', error)
		return data as any
	}
}
