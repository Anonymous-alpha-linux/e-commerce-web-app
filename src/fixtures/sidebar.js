import { FaHome, FaPenSquare, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { AiFillRightCircle, AiFillPieChart } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { RiAccountCircleFill } from "react-icons/ri";

export default [
    {
        icon: <FaHome></FaHome>,
        title: 'Dashboard',
        link: '/'
    },
    {
        icon: <AiFillPieChart></AiFillPieChart>,
        title: 'Chart',
        link: '/'
    },
    {
        icon: <GrDocumentText></GrDocumentText>,
        title: 'Document',
        link: '/management/attachment'
    },
    {
        icon: <FaPenSquare></FaPenSquare>,
        title: 'Category',
        link: '/management/category'
    },
    {
        icon: <RiAccountCircleFill></RiAccountCircleFill>,
        title: 'Account',
        link: '/management/member'
    },
    // {
    //     icon: <MdOutlineWork></MdOutlineWork>,
    //     title: 'Workspace',
    // },
]