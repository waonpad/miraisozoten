// import { useNavigate } from 'react-router-dom';

// import { useAuth } from '@/context/auth/use-auth';

// const menuItems = [
//   {
//     key: 'home',
//     label: 'Home',
//     to: '/',
//   },
//   {
//     key: 'charecters',
//     label: 'Charecters',
//     to: '/charecters/:currentPage?',
//   },
// ];

// export default function AppBar() {
//   const navigate = useNavigate();
//   const auth = useAuth();

//   const handleMenuClick = (to: string) => {
//     navigate(to);
//   };

//   const renderedMenuItems = menuItems.map((item) => (
//     <li key={item.key}>
//       <a onClick={() => handleMenuClick(item.to)}>{item.label}</a>
//     </li>
//   ));

//   return (
//     <div className="navbar bg-base-100">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn-ghost btn lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </label>
//           <ul
//             tabIndex={0}
//             className="dropdown-content menu rounded-box menu-compact bg-base-100 mt-3 w-52 p-2 shadow"
//           >
//             {renderedMenuItems}
//           </ul>
//         </div>
//         <a className="btn-ghost btn text-xl normal-case">[Logo]</a>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{renderedMenuItems}</ul>
//       </div>
//       <div className="navbar-end">
//         {auth.user && (
//           <div className="dropdown dropdown-end">
//             <label tabIndex={0} className="btn-ghost btn">
//               {auth.user.email}
//             </label>
//             <ul
//               tabIndex={0}
//               className="dropdown-content menu rounded-box menu-compact bg-base-100 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <a onClick={() => auth.logout()}>Logout</a>
//               </li>
//             </ul>
//           </div>
//         )}
//         {!auth.user && (
//           <a onClick={() => navigate('/login')} className="btn-primary btn-sm btn">
//             Login
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }

export const AppBar = () => {
  return <div>AppBar</div>;
};
