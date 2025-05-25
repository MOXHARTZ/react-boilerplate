import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <>
            <div className='text-red-300'>Layout</div>
            <Outlet />
        </>
    )
}
