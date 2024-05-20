import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';


export const DefaultLayout = () => {

  return (
    <main className="bg-bg_color">
      <Navbar />
      <section className="min-h-[calc(100vh-107px)]">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};
