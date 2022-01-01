import { Scenes } from "telegraf"
import { MyContext } from "../types/spreadSheetTypes"
import { salaryScene } from "./salaryScene"

export const stage = new Scenes.Stage<MyContext>([salaryScene])
