// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockableFunction = (...argument: any[]) => any

export const asMock = <F extends MockableFunction>(mockedFunction: F): jest.MockedFunction<F> =>
	mockedFunction as jest.MockedFunction<F>
