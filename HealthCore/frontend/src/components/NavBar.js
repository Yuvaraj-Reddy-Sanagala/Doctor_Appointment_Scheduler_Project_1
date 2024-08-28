import React from 'react';
import '../App.css';
import { useHistory } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import logo from './logos/flaskpy.png';


const  NavBar = () => {

    const history = useHistory();
    const handleItemClick = async(e, {name}) =>{
        e.preventDefault();
        if (name === 'Home'){
            history?.push("/dashboard");
        }
        else if(name === 'Scheduler'){
            history?.push("/scheduler");
        }
        else if(name === 'Pharmacy'){
            history?.push({pathname:"/Pharmacy",});
        }
        else if (name === 'Contact Us'){
            history?.push("/Contact Us");
        }
    }


    return (
            <Menu size="large" stackable borderless fixed='top' >
                <Menu.Item id="logo">
                    <a  href='/'>
                    <Image src={logo} width='60px' style={{padding:'0px 10px 0px 0px'}}/>
                    </a>
                    <p><b>Doc-Scheduler</b></p>
                </Menu.Item>
                <div className="navs">
                    <Menu.Item
                        name='Home'
                        onClick={handleItemClick}
                     />
                    <Menu.Item 
                        name='Scheduler'
                        onClick={handleItemClick}
                    />
                    <Menu.Item 
                        name='Pharmacy'
                        onClick={handleItemClick}
                     />
                    <Menu.Item 
                        name='Contact Us'
                        onClick={handleItemClick}
                    />
                </div>
            </Menu>
    )
}
export default NavBar;