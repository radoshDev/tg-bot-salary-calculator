declare namespace NodeJS {
	type ProcessEnv = {
		NODE_ENV: "development" | "production" | "test"
		SB_BOT_TOKEN: string | undefined
		SB_SPREADSHEET_EMAIL: string | undefined
		SB_SPREADSHEET_PRIVATE_KEY: string | undefined
		SB_SPREADSHEET_ID: string | undefined
	}
}
