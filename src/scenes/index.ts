import { Scenes } from "telegraf"
import { MyContext } from "../types/spreadSheetTypes"
import { advanceScene } from "./advanceScene"
import { reportScene } from "./reportScene"
import { salaryScene } from "./salaryScene"

export const stage = new Scenes.Stage<MyContext>([salaryScene, reportScene, advanceScene])
