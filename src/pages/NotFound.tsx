import React from 'react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Title } from '@/components/ui';

const NotFound: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <Title className='text-[48px] mt-[50px]'>Oops!</Title>
            <p className='text-center text-primary_800_color font-bold'>Error 404 - Page Not Found</p> 
            <div className='flex flex-col md:flex-row items-center justify-center gap-6 min-h-[50vh]' style={{ padding: '15px' }}>
                <img src="/assets/papel_arrugado.svg" alt="Error 404" className="w-[572px] h-[115px]" />
                <div className='max-w-[500px] text-center'>
                    <p>It looks like this origami unfolded.</p>
                    <p className='text-grey_500_color'>We can't find the page you're looking for, but we can help you fold things back together.</p>
                    <p>Go back to the homepage and keep exploring!</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default NotFound;