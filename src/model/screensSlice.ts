import { createSlice, PayloadAction, createAction, ActionCreator } from '@reduxjs/toolkit';
import { FlatScreenDto, ScreenDto } from './../lib/typings/index';

export type screens = {
	screensList: FlatScreenDto[]
}

const initialState: screens = {
	screensList: []
}

export const screensSlice = createSlice({
	name: 'screens',
	initialState,
	reducers: {
		getAllScreens: (state, action: PayloadAction<{ screens: FlatScreenDto[]}>) => {
			state.screensList = action.payload.screens
		},
		addScreen: (state, action: PayloadAction<{ screen: FlatScreenDto}>) => {
			state.screensList = [...state.screensList, action.payload.screen]
		},
		getScreen: (state, action: PayloadAction<{ screen: ScreenDto}>) => {
			console.log(action.payload.screen)
		}
	}
})
type getScreeenRequestType = {}
const asyncScreenActions = {
	addScreenRequest: createAction('screens/addScreens_request'),
	getScreenRequest: createAction<number>('screens/getScreen_request' as const)
}

export const screensActions = {
	...screensSlice.actions,
	...asyncScreenActions
}