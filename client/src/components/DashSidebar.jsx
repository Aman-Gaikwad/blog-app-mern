import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
    const location  = useLocation();
    const {currentUser} = useSelector((state) => state.user);
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromURL = urlParams.get('tab');
        if(tabFromURL){
            setTab(tabFromURL);
        }
    }, [location.search]);

    const handleSignout = async () =>{
      try {
        const res = await fetch(`/api/user/signout`, {
          method: 'POST',
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        } else{
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    
    return (
    <>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to='/dashboard?tab=profile' >
                <Sidebar.Item  
                  active={tab === 'profile'} 
                  icon={HiUser} 
                  label={currentUser.isAdmin ? "Admin" : "User"} 
                  labelColor='dark' as='div' 
                >
                    Profile
                </Sidebar.Item>
            </Link>

            {currentUser.isAdmin &&
              <Link to='/dashboard?tab=posts'>
                  <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                    Posts
                  </Sidebar.Item>
            </Link>
            }
            <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
                Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
