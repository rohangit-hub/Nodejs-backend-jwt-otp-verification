import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText } from '@mui/material';


import "../App.css"

// icons import


import avatar from '../assets/avatar.jpg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("Rohan")

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  return (
    <div className=' flex flex-wrap w-[100%] h-[10vh] p-[3vh] jutify-center content-center'>

      <img src={avatar} alt='Avatar Image' onClick={toggleDrawer()}
        className="w-9 h-9 border-[#EDEDED] rounded-full self-center justify-self-start 
        hover:scale-110 easy-linear duration-500 shadow-md hover:shadow-blue-300" />

      {/* Drawer Code */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer()} className='font-roboto'>
        <div className=' flex flex-col h-[100vh] w-[250px] text-[#EDEDED] bg-[#505050] justify-between p-[1vh]'>

          <div className='flex flex-row justify-between content-center items-center p-[3vh] w-full h-[10vh]'>
            <p >Hello {userName}</p>
            <img src={avatar} alt='Avatar Image' onClick={toggleDrawer()}
              className="w-9 h-9 border-[#EDEDED] rounded-full" />
          </div>


          <div className='flex flex-row justify-center content-center self-start w-full h-[80vh] p-[3vh]'>
            <ul className='w-full h-[75vh]'>
              {['Home', 'About', 'Contact'].map((text) => (
                  <li className='pt-[2vh]'>{text}</li>
              ))}
            </ul>
          </div>

          <div className='flex flex-row justify-evenly content-center self-start p-[2vh] w-full h-[10vh]'>
            <p> SignIn </p>
            <p> SignUp </p>
          </div>

        </div>
      </Drawer>
    </div>
  );
}