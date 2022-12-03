import { ALLOWED_USER_LIST } from "../constants"

export const isAllowUser = (userId: number): boolean => {
	return ALLOWED_USER_LIST.includes(userId)
}
