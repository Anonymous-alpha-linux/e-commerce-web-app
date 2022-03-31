import { FaHome, FaPenSquare, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { AiFillRightCircle, AiFillPieChart } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { RiAccountCircleFill } from "react-icons/ri";
import roles from "./roles";

const sidebar = [
    {
        icon: <FaHome></FaHome>,
        title: 'Dashboard',
        link: '/',
        authorized: Object.entries(roles).map(role => role[1])
    },
    {
        icon: <AiFillPieChart></AiFillPieChart>,
        title: 'Chart',
        link: '/',
        authorized: Object.entries(roles).map(role => role[1])
    },
    {
        icon: <GrDocumentText></GrDocumentText>,
        title: 'Document',
        link: '/management/attachment',
        authorized: Object.entries(roles).map(role => role[1])
    },
    {
        icon: <FaPenSquare></FaPenSquare>,
        title: 'Category',
        link: '/management/category',
        authorized: Object.entries(roles).map(role => role[1])
    },
    {
        icon: <RiAccountCircleFill></RiAccountCircleFill>,
        title: 'Account',
        link: '/management/member',
        authorized: [roles.ADMIN]
    },
]

export default sidebar;