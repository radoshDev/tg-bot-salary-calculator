export function compliment(income: number) {
	if (income > 600) {
		return `Твій заробіток *${income} грн.*\n\n Ти молодець! Гарно попрацювала😘`
	}
	return `Твій заробіток *${income} грн.*\n\n Це теж не погано, молодчинка. Приїдеш додому я тобі зроблю чаю з ромашкою`
}
