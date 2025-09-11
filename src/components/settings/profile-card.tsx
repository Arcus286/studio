'use client';
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, BookOpen, Phone } from "lucide-react";

export function ProfileCard() {
  const { user } = useAuth();

  if (!user) return null;

  const infoItems = [
    { icon: Briefcase, text: user.designation, fallback: "No designation set" },
    { icon: Building, text: user.university, fallback: "No university set" },
    { icon: BookOpen, text: user.major, fallback: "No major set" },
    { icon: Phone, text: user.phoneNumber, fallback: "No phone number set" },
  ];

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="relative inline-block">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-2xl font-bold">{user.username}</h2>
        <p className="text-muted-foreground">{user.email}</p>
        <Badge variant="secondary" className="mt-2">{user.role}</Badge>

        <div className="text-left mt-8 space-y-4">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 text-sm">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className={item.text ? "text-foreground" : "text-muted-foreground italic"}>
                {item.text || item.fallback}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
