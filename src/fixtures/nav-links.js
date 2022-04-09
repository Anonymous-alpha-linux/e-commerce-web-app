import { roles } from '../fixtures';

const entryRoles = Object.values(roles);

const navLinks = [
    {
        name: 'Profile',
        path: '/profile/personal',
        authorized: entryRoles
    },
    {
        name: 'My Posts',
        path: '/history',
        authorized: entryRoles
    }
];

export default navLinks;