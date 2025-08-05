import { Outlet, useNavigate } from 'react-router'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useVisible from '@/hooks/useVisible'
import { useExitListener } from '@/hooks/useExitListener'

export default function Layout() {
    const [autoAnimate] = useAutoAnimate()
    const navigate = useNavigate()
    const [visible, setVisible] = useVisible<{ visible: boolean }>('toggle_visible', (data) => {
        if (data.visible) {
            navigate('/')
        }
    })
    useExitListener(setVisible)
    return (
        <div ref={autoAnimate} className='flex justify-between w-screen h-screen p-4 gap-4'>
            {visible && (
                <Outlet />
            )}
        </div>
    )
}
