import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={`/`}>
          <Image src={`/innov8.png`} alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={`/startup/create`}>
                <span className="max-sm:hidden">Create</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <BadgePlus className="size-6 sm:hidden" />
                    </TooltipTrigger>
                    <TooltipContent>Create</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <LogOut className="size-6 sm:hidden text-red-500" />
                      </TooltipTrigger>
                      <TooltipContent>Logout</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
