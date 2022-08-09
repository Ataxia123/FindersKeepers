import React from 'react';

// displays a page header

export default function Header({ link, title, subTitle }) {
  return (
    <div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={'https://i.imgur.com/7gTbXRd.jpg'} alt="profile" />
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h2>
      </a>
      <p className="text-sm font-normal italic text-gray-500 dark:text-slate-100 tracking-wide">{subTitle}</p>
    </div>
  );
}

Header.defaultProps = {
  link: 'https://github.com/Ataxia123/scaffold-eth-tailwind',
  title: 'Finders Keepers',
  subTitle: 'Enjoying Good Art',
};
