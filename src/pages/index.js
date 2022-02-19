// 1. Main
export { default as Home } from './home';
export { default as Login } from './signin';
export { default as Register } from './signup';
export { default as ForgetPassword } from './forgot.password';
export { default as Loading } from './loading';
export { default as ProtectedPage } from './page.protected';
export { default as Layout } from './layout';
export { Nav } from '../containers';


// 2. QA coordinator
export * from './QAcoordinator';
// 3. Admin
export * from './admin';
// 4. Staff
export * from './staff';
// 5. QA manager
export * from './QAManager';
