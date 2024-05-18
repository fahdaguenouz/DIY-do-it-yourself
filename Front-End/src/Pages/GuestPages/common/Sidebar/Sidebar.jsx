import React, { useState } from 'react';
import './Sidebar.css';
const Sidebar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const toggleNav = () => {
        setIsNavExpanded(!isNavExpanded);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };
    return (
        <div>

            <header className="headerr">
                <div className="header_container">
                    <div className="none"> </div>
                    <div className="search">
                        <input type="search" placeholder="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>


                    <div className="user">
                        <div className="icon">
                            <i className="fa-solid fa-video"></i>
                            <i className="fa-solid fa-grip"></i>
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className="imgg">
                            <img className='imagee' src="images/logo.png" />
                        </div>
                    </div>

                    <div className="toggle">
                        <i className="fa-solid fa-bars" id="header-toggle"></i>
                    </div>
                </div>
            </header>


            <section className={`navv ${isNavExpanded ? 'show-menu' : ''}`} id="navbar">
                <nav className="nav_container">
                    <div>
                        <a href="#" className="nav_link nav_logo" onClick={() => handleLinkClick('home')}>
                            <i className="fa-solid fa-bars nav_icon"></i>
                            <span className="logo_name">
                                <i className="fab fa-youtube"></i>
                                Youtube
                            </span>
                        </a>

                        <div className="nav_list">
                            <div className="nav_items navtop">
                            {['home', 'explore', 'shortVideo', 'channel', 'library', 'history', 'like'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`nav_link ${activeLink === item ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(item, e)}
                            >
                                <i className={`fa ${iconClass(item)} nav_icon`}></i>
                                <span className="nav_name">{capitalize(item)}</span>
                            </a>
                        ))}


                                <div className="nav_dropdown">
                                    <a href="#" className="nav_link" onClick={(e) => handleLinkClick('showMore', e)}>
                                        <i className="fa-solid fa-chevron-down nav_icon"></i>
                                        <span className="nav_name">Show More </span>
                                    </a>

                                    <div className="nav_dropdown-collapse">
                                        <div className="nav_dropdown-content">
                                            <a href="#" className="nav_dropdown-item">Grid Box</a>
                                            <a href="#" className="nav_dropdown-item">Frontend Design</a>
                                            <a href="#" className="nav_dropdown-item">Backend Design</a>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" className="nav_link">
                                    <i className='bx bx-message-rounded nav_icon'></i>
                                    <span className="nav_name">Messages</span>
                                </a>
                            </div>

                            <div className="nav_items subscribe-container">
                                <h3 className="nav_subtitle h33">SUBSCRIPTIONS</h3>

                                <a href="#" className="nav_link">
                                    <img className="subscribe" src="https://img.icons8.com/external-victoruler-flat-victoruler/64/000000/external-boy-people-victoruler-flat-victoruler-5.png" />
                                    <span className="nav_name">GorkCoder</span>
                                </a>
                                <a href="#" className="nav_link">
                                    <img className="subscribe" src="https://img.icons8.com/external-victoruler-flat-victoruler/64/000000/external-boy-occupation-and-people-victoruler-flat-victoruler.png" />
                                    <span className="nav_name">React Master</span>
                                </a>
                                <a href="#" className="nav_link">
                                    <img className="subscribe" src="https://img.icons8.com/external-victoruler-linear-colour-victoruler/64/000000/external-boy-children-avatar-victoruler-linear-colour-victoruler-2.png" />
                                    <span className="nav_name">Frontend Development</span>
                                </a>
                                <a href="#" className="nav_link">
                                    <img className="subscribe" src="https://img.icons8.com/external-victoruler-flat-victoruler/64/000000/external-boy-children-avatar-victoruler-flat-victoruler-12.png" />
                                    <span className="nav_name">Backend Development</span>
                                </a>


                                <div className="nav_dropdown">
                                    <a href="#" className="nav_link">
                                        <i className="fa-solid fa-chevron-down nav_icon"></i>
                                        <span className="nav_name">Show 3 More</span>
                                    </a>

                                    <div className="nav_dropdown-collapse nav_dropdown-second">
                                        <div className="nav_dropdown-content">
                                            <a href="#" className="nav_dropdown-item">
                                                <img className="subscribe" src="https://img.icons8.com/external-victoruler-flat-victoruler/64/000000/external-boy-children-avatar-victoruler-flat-victoruler-12.png" />
                                                <span className="nav_name">Backend Design</span>
                                            </a>
                                            <a href="#" className="nav_dropdown-item">
                                                <img className="subscribe" src="https://img.icons8.com/external-victoruler-flat-victoruler/64/000000/external-boy-children-avatar-victoruler-flat-victoruler-12.png" />
                                                <span className="nav_name">Backend Design</span>
                                            </a>
                                            <a href="#" className="nav_dropdown-item">
                                                <img className="subscribe" src="https://img.icons8.com/external-victoruler-flat-victoruler/64/000000/external-boy-children-avatar-victoruler-flat-victoruler-12.png" />
                                                <span className="nav_name">Backend Design</span>
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </nav>
            </section>


            <main>
                <section class="sectionn transheader homepage parallax" data-stellar-background-ratio="0.5" style={{ backgroundImage: "url('images/GettyImages_641535676.0.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div class="containerr">
                        <div class="roww">
                            <div class="col-md-10 col-md-offset-1 col-sm-12 text-center">
                                <h2>Let's Analysis Your Website SEO</h2>
                                <p class="lead">Now you can customize your SEO service according to your need</p>
                                <form class="calculateform">
                                    <div class="item-box">
                                        <div class="item-top form-inline">
                                            <div class="form-group">
                                                <div class="input-group2">
                                                    <span class="input-addon">
                                                        <i class="fa fa-link"></i>
                                                    </span>
                                                    <input type="url" class="form-control" id="urladres" name="url" placeholder="Add your website url" />
                                                </div>
                                            </div>
                                            <input type="submit" name="send" value="Analysis" class="btn btn-default" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

const iconClass = (name) => {
    switch (name) {
        case 'home': return 'fa-house';
        case 'explore': return 'fa-compass';
        case 'shortVideo': return 'fa-tiktok';
        case 'channel': return 'fa-users';
        case 'library': return 'fa-video';
        case 'history': return 'fa-clock-rotate-left';
        case 'like': return 'fa-thumbs-up';
        default: return 'fa-circle';
    }
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export default Sidebar;
