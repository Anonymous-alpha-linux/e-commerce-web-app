import { FaHome, FaPenSquare, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { AiFillRightCircle, AiFillPieChart } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { RiAccountCircleFill } from "react-icons/ri";

export default [
    {
        icon: <FaHome></FaHome>,
        title: 'Dashboard',
    },
    {
        icon: <AiFillPieChart></AiFillPieChart>,
        title: 'Chart',
    },
    {
        icon: <GrDocumentText></GrDocumentText>,
        title: 'Document',
    },
    {
        icon: <FaPenSquare></FaPenSquare>,
        title: 'Category',
    },
    {
        icon: <RiAccountCircleFill></RiAccountCircleFill>,
        title: 'Account',
    },
    // {
    //     icon: <MdOutlineWork></MdOutlineWork>,
    //     title: 'Workspace',
    // },
]