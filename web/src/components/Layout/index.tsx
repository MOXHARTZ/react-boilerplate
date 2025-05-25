import { Outlet, useNavigate } from 'react-router'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAppDispatch, useAppSelector } from '@/stores'
import useNuiEvent from '@/hooks/useNuiEvent'
import { setVisible } from '@/stores/Main'

export default function Layout() {
    const [autoAnimate] = useAutoAnimate()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { visible } = useAppSelector(state => state.main)
    useNuiEvent('toggle_visible', (visible: boolean) => {
        dispatch(setVisible(visible));
        if (visible) {
            navigate('/')
        }
    });
    return (
        <div ref={autoAnimate} className='flex justify-between w-screen h-screen p-4 gap-4'>
            {visible && (
                <>
                    <Outlet />
                </>
            )}
        </div>
    )
}
