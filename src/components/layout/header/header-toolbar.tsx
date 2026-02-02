import {
	User,
	LogOut,
	Settings,
	Sun,
	Moon,
} from "lucide-react";
import { toAbsoluteUrl } from "@/lib/utils";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
	AvatarStatus,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "@tanstack/react-router";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export function HeaderToolbar() {
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	const session = authClient.useSession();

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const handleSignOut = async () => {
		await authClient.signOut();
		router.invalidate();
		router.navigate({ to: "/login" });
	};

	const user = session.data?.user;

	return (
		<nav className="flex items-center gap-2">
			{/* Color Scheme Switcher */}
			<ThemeSwitcher />

			{/* Theme Mode Switcher */}
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleTheme}
				className="h-10 w-10 rounded-full hover:bg-primary/10 active:bg-primary/20 relative group"
			>
				{theme === "light" ? (
					<Moon className="size-5 text-foreground transition-transform group-hover:scale-110" />
				) : (
					<Sun className="size-5 text-foreground transition-transform group-hover:scale-110" />
				)}
			</Button>

			<LanguageSwitcher />

			<DropdownMenu>
				<DropdownMenuTrigger className="cursor-pointer ml-1">
					<Avatar className="size-8 border border-border">
						<AvatarImage
							src={user?.image || toAbsoluteUrl("/media/avatars/300-2.png")}
							alt={user?.name || "User"}
						/>
						<AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
						<AvatarIndicator className="-end-1 -top-1">
							<AvatarStatus variant="online" className="size-2.5" />
						</AvatarIndicator>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56"
					side="bottom"
					align="end"
					sideOffset={8}
				>
					{/* User Information Section */}
					<div className="flex items-center gap-3 px-3 py-2">
						<div className="flex flex-col items-start overflow-hidden">
							<span className="text-sm font-semibold text-foreground truncate w-full">
								{user?.name || "Traveler"}
							</span>
							<span className="text-xs text-muted-foreground truncate w-full">
								{user?.email || "user@example.com"}
							</span>
						</div>
					</div>

					<DropdownMenuSeparator />

					<DropdownMenuItem onClick={() => router.navigate({ to: "/profile" })}>
						<User className="mr-2 size-4" />
						<span>Profile</span>
					</DropdownMenuItem>

					<DropdownMenuItem onClick={() => router.navigate({ to: "/settings" })}>
						<Settings className="mr-2 size-4" />
						<span>Settings</span>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
						<LogOut className="mr-2 size-4" />
						<span>Sign out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
}
