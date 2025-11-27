import { Bell, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { NotificationsPanel } from "./NotificationsPanel";
import { MessagesPanel } from "./MessagesPanel";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface HeaderProps {
  onNavigate: (page: "home" | "schedule" | "profile" | "documents" | "registration" | "academic" | "feedback") => void;
  currentPage: "home" | "schedule" | "profile" | "documents" | "registration" | "academic" | "feedback";
  onOpenChat: () => void;
}

export function Header({ onNavigate, currentPage, onOpenChat }: HeaderProps) {
  return (
    <header className="bg-[#3BA5DB] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate("home")}
              className="text-white rounded-lg px-3 py-2 flex items-center justify-center hover:opacity-90 transition-opacity"
            >
            <img src="assets/logo.png" alt="BK Logo" className="h-10 w-auto" />
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onNavigate("home")}
                className={`hover:opacity-80 transition-opacity ${
                  currentPage === "home" ? "underline" : ""
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => onNavigate("academic")}
                className={`hover:opacity-80 transition-opacity ${
                  currentPage === "academic" ? "underline" : ""
                }`}
              >
                Quản lí học tập
              </button>
              <button
                onClick={() => onNavigate("schedule")}
                className={`hover:opacity-80 transition-opacity ${
                  currentPage === "schedule" ? "underline" : ""
                }`}
              >
                Lịch học của tôi
              </button>
              <button
                onClick={() => onNavigate("registration")}
                className={`hover:opacity-80 transition-opacity ${
                  currentPage === "registration" ? "underline" : ""
                }`}
              >
                Đăng ký môn
              </button>
              <button
                onClick={() => onNavigate("documents")}
                className={`hover:opacity-80 transition-opacity ${
                  currentPage === "documents" ? "underline" : ""
                }`}
              >
                Tài liệu
              </button>
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 relative"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-0 text-xs">
                    2
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <NotificationsPanel />
              </PopoverContent>
            </Popover>

            {/* Messages */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 relative"
                >
                  <MessageCircle className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-0 text-xs">
                    2
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <MessagesPanel onOpenChat={onOpenChat} />
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#3BA5DB] text-sm">A</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate("profile")}>
                  Hồ sơ cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
