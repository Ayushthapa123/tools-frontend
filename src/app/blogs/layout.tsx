import Footer from 'src/features/Footer';
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" mx-auto max-w-[1800px] ">
      {/* <CommonNav /> */}
      <div className="px-5 lg:px-10">{children}</div>

      <Footer />
    </div>
  );
}
