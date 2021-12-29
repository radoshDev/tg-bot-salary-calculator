declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test"
		TG_BOT_TOKEN: string
		SPREADSHEET_EMAIL: string
		SPREADSHEET_PRIVATE_KEY: string
		SPREADSHEET_ID: string
	}
}
