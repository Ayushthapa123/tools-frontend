import Footer from 'src/features/Footer';
import { CommonNav } from 'src/features/NavBar/CommonNav';
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-base-100 ">
      <div>{children}</div>
      <Footer />
    </div>
  );
}
