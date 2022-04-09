import { IoHomeSharp } from 'react-icons/io5';
import { RiHistoryLine } from 'react-icons/ri';
import { FaUserAlt, FaUsers, FaUserTie } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const navigators = [
    {
        icon: <IoHomeSharp></IoHomeSharp>,
        label: 'home',
        link: ''
    },
    {
        icon: <RiHistoryLine></RiHistoryLine>,
        label: 'my posts',
        link: 'history'
    },
    {
        icon: <FaUserAlt></FaUserAlt>,
        label: 'user',
        link: '/profile/personal'
    },
    {
        icon: <FaUsers></FaUsers>,
        label: 'workspace',
        // link: '/management/workspace_member/',
        link: '/workspace',
        destination: true,
        // trigger: true,
    },
    {
        icon: <FaUserTie></FaUserTie>,
        label: 'manager',
        link: '/profile/manager'
    },
    {
        icon: <FiLogOut></FiLogOut>,
        label: 'logout',
        link: 'logout'
    }
]
export default navigators;