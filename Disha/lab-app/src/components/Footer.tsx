import React from "react";
import { socials } from "../constants";

interface Social {
  id: string;
  url: string;
  iconUrl: string;
  title: string;
}

const Footer: React.FC = () => {
  return (
    <div  className="!px-0 !py-10 bg-gray-300">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-n-6 lg:block">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
        <ul className="flex gap-5 flex-wrap">
          {socials.map((item: Social) => (  
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6 "
            >
              <img src={item.iconUrl} width={16} height={16} alt={item.title} />
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
