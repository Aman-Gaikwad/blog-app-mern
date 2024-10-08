import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DashProfile, DashSidebar, DashPosts } from '../components/components.exporter.js';

export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get('tab');
    if(tabFromURL){
        setTab(tabFromURL);
    }
  }, [location.search]);

  return (
      <>
        <div className='min-h-screen flex flex-col md:flex-row'>
          {/* Sidebar */}
          <div className='md:w-56' >
            <DashSidebar/>
          </div>
          
          <div className='w-full'>
            {/* profile */}
            {tab === 'profile' && <DashProfile/>}
            {/* posts of admin */}
            {tab === 'posts' && <DashPosts/>}
          </div>
        </div>
      </>
  )
}
