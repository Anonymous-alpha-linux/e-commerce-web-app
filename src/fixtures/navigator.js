import { IoHomeSharp } from 'react-icons/io5';
import { RiHistoryLine } from 'react-icons/ri';
import { FaUserAlt, FaUsers, FaUserTie } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
const navigators = [
    {
        icon: <IoHomeSharp></IoHomeSharp>,
        label: 'home'
    },
    {
        icon: <RiHistoryLine></RiHistoryLine>,
        label: 'my posts'
    },
    {
        icon: <FaUserAlt></FaUserAlt>,
        label: 'user'
    },
    {
        icon: <FaUsers></FaUsers>,
        label: 'group'
    },
    {
        icon: <FaUserTie></FaUserTie>,
        label: 'manager'
    },
    {
        icon: <FiLogOut></FiLogOut>,
        label: 'logout'
    }
]
export default navigators;