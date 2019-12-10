import React from 'react';

export default (props) => {
    return <div className="p-5 h-screen LeftSideBar sticky top-0 overflow-auto">
        {props.children}
    <style jsx>
    	{
    		`
    			.LeftSideBar::-webkit-scrollbar {
    			  display: none;
    			}
    		`
    	}
    </style>
    </div>
}