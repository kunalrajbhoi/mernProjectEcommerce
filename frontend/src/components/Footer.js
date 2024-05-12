import React from 'react';
import { FaLinkedin, FaGithub, FaDownload } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4'>
        <div className='flex justify-center items-center'>
          <p className='text-center font-bold' title='kunal raj bhoi'>kunal raj bhoi</p>
          <div className='ml-4'>
            <a href='https://www.linkedin.com/in/kunal-raj-bhoi-ab8a791ba/' target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:text-blue-700'>
              <FaLinkedin size={20} />
            </a>
          </div>
          <div className='ml-4'>
            <a href='https://github.com/kunalrajbhoi' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-gray-800'>
              <FaGithub size={20} />
            </a>
          </div>
          <div className='ml-4'>
            <p className='text-gray-600 hover:text-gray-800'>Contact: +9024186854</p>
          </div>
          <div className='ml-4'>
            <a href='/CV-KunalRajBhoi.pdf' download className='text-gray-600 hover:text-gray-800 flex items-center'>
              <FaDownload size={20} className='mr-1' />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
