import { ALLOWED_USER_LIST } from "../constants"

export const isAllowUser = (userId: number | undefined): boolean => {
	if (!userId) return false
	return ALLOWED_USER_LIST.includes(userId)
}
