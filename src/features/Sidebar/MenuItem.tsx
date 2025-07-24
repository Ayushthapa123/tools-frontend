import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  icon: JSX.Element;
  text: string;
  href: string;
  isActive?: boolean;
  handleFunc?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, text, href, isActive, handleFunc }) => { 

    const router = useRouter();
    const handleRedirect = () => {
        if(handleFunc){
            handleFunc();
        }else{
            // it should also close the drawer
            router.push(href) 
            // close the drawer
            document.getElementById('my-drawer-2')?.click();
        }
    }
    return (
      <div className="flex w-full items-center text-[1.3rem]">
        <Link href={href} className="w-full">
          <div
            onClick={() => {
              handleRedirect();
            }}
            className={`flex w-full gap-[1rem] rounded-lg py-[0.3rem] pl-3 ${
              isActive
                ? 'bg-base-200 font-semibold text-primary'
                : 'text-dark font-medium hover:bg-base-200'
            }`}
          >
            <div className="relative top-[5px] font-bold text-primary">{icon}</div>
            <div className="relative left-[-8px] flex items-center">{text}</div>
          </div>
        </Link>
      </div>
    );
  };

export default MenuItem;