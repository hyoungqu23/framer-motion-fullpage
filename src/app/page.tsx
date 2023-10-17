'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: '100dvh',
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
  out: {
    opacity: 0,
    y: '-100dvh',
  },
};

const imageVariants = {
  initial: {
    y: '-50vh',
  },
  in: {
    y: '0',
  },
  out: {
    y: '-50vh',
  },
};

const Page = ({ pageName }: { pageName: string }) => {
  return (
    <section className='h-[100vh] w-full flex justify-center items-center bg-slate-500'>
      <h1 className='text-5xl font-extrabold text-red-400'>{pageName}</h1>
      <motion.div
        initial='initial'
        animate='in'
        exit='out'
        variants={imageVariants}
      >
        <Image
          src={
            'https://content.surfit.io/thumbs/image/5zjN5/4bakQ/1218171857652d575fb603f.png/cover-top-left-1x.webp'
          }
          width={500}
          height={500}
          alt='이미지'
        />
      </motion.div>
    </section>
  );
};

const pages = [
  <Page pageName='Home' key='HOME' />,
  <Page pageName='One' key='ONE' />,
  <Page pageName='Two' key='TWO' />,
  <Page pageName='Three' key='THREE' />,
  <Page pageName='Four' key='FOUR' />,
  <Page pageName='Five' key='FIVE' />,
];

interface IHomePageProps {
  searchParams: { page: string };
}

export default function Home({ searchParams: { page } }: IHomePageProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (page) setCurrentPage(Number(page));
  }, [page]);

  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY < 0 && currentPage > 0)
      router.push(`?page=${currentPage - 1}`);

    if (event.deltaY > 0 && currentPage < pages.length - 1)
      router.push(`?page=${currentPage + 1}`);
  };

  return (
    <main onWheel={handleWheel}>
      <LayoutGroup>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentPage}
            initial='initial'
            animate='in'
            exit='out'
            variants={pageVariants}
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </main>
  );
}
