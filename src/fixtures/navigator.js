import { IoHomeSharp } from 'react-icons/io5';
import { RiHistoryLine } from 'react-icons/ri';
import { FaUserAlt, FaUsers, FaUserTie } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
const navigators = [
    {
        icon: <IoHomeSharp></IoHomeSharp>,
        label: 'home',
        link: 'home'
    },
    {
        icon: <RiHistoryLine></RiHistoryLine>,
        label: 'my posts',
        link: 'history'
    },
    {
        icon: <FaUserAlt></FaUserAlt>,
        label: 'user',
        link: 'profile'
    },
    {
        icon: <FaUsers></FaUsers>,
        label: 'group',
        link: 'group'
    },
    {
        icon: <FaUserTie></FaUserTie>,
        label: 'manager',
        link: 'manager'
    },
    {
        icon: <FiLogOut></FiLogOut>,
        label: 'logout',
        link: 'logout'
    }
]
export default navigators;