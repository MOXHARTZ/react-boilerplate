// Purpose: This hook is used to check if the user is visible in the game generally

import { useState } from "react"
import useNuiEvent from "./useNuiEvent"
import { fetchNui } from "@/utils/fetchNui"

type VisibleData = {
    visible: boolean;
}

export default function useVisible<T extends VisibleData>(
    eventName: string,
    handler: (data: T) => void
) {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState<Omit<T, 'visible'> | null>(null)

    useNuiEvent(eventName, (data: T) => {
        setVisible(data.visible)
        const { visible: _visible, ...rest } = data
        setData(data.visible ? (rest as Omit<T, 'visible'>) : null)
        handler(data)
        fetchNui('play_sound', data.visible ? 'item_down' : 'hover_up')
    })

    return [visible, setVisible, data, setData] as const
}
