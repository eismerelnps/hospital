import { Button } from "@/components/ui/button";
import { DrawerOptionType } from "@/lib/components/Drawer/types/DrawerTypes";
import Link from "next/link";

export default function DrawerOption({ option }: { option: DrawerOptionType }) {
  const { icon, heading, url, active } = option;
  return (
    <Button asChild variant={active ? 'secondary' : 'default'}>
      <Link href={url}>
        <div className={` size-full flex justify-start items-center`}>
          <div className="basis-2/12">
            {icon}
          </div>
          <div className="basis-10/12 flex justify-start items-center">
            <p className="lg:text-lg">{heading}</p>
          </div>
        </div>
      </Link>
    </Button>
  )
}