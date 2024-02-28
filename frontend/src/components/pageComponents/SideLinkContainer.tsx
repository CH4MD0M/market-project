import React from 'react';
import { Link } from 'react-router-dom';

import { LinkMenu } from '@constants/.';

interface SideLinkContainerProps {
  menuItemsList: LinkMenu[];
}

const SideLinkContainer = ({ menuItemsList }: SideLinkContainerProps) => {
  return (
    <div className=" h-fit mb-10 md:mb-0 md:mr-[40px] bg-zinc-100">
      <div className="h-[60px] text-center box-border flex justify-center items-center p-1 bg-[rgb(40,109,180)]">
        <span className="text-white indent-[inherit] text-center text-xl font-bold tracking-[0px] border-[rgb(40,109,180)]">
          마이 페이지
        </span>
      </div>
      <ul className="border flex justify-around items-center py-3 md:flex-col md:justify-start md:items-start md:px-3">
        {menuItemsList.map(({ name, path }) => {
          return (
            <li key={path} className="my-1 hover:text-[rgb(61,130,247)]">
              <Link to={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideLinkContainer;
