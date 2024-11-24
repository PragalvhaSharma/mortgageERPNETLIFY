"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, UserCircle, Paperclip, X } from "lucide-react";
import { Employee } from "./columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "employee";
  timestamp: Date;
  attachments?: {
    name: string;
    url: string;
    size: number;
  }[];
}

interface ChatDialogProps {
  employee?: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FileAttachment {
  file: File;
  previewUrl: string;
}

export function ChatDialog({ employee, open, onOpenChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      scrollToBottom();
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (employee) {
      const savedMessages = localStorage.getItem(`chat-${employee.id}`);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map((message: ChatMessage) => ({
          ...message,
          timestamp: new Date(message.timestamp)
        }));
        setMessages(parsedMessages);
      }
    }
  }, [employee]);

  useEffect(() => {
    if (employee && messages.length > 0) {
      localStorage.setItem(`chat-${employee.id}`, JSON.stringify(messages));
    }
  }, [messages, employee]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      setAttachments(prev => [...prev, { file, previewUrl }]);
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      URL.revokeObjectURL(newAttachments[index].previewUrl);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const processedAttachments = attachments.map(att => ({
      name: att.file.name,
      url: att.previewUrl,
      size: att.file.size,
    }));

    const userMessage: ChatMessage = {
      id: `user-${messages.length + 1}`,
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      attachments: processedAttachments,
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setAttachments([]);

    setTimeout(() => {
      const employeeMessage: ChatMessage = {
        id: `employee-${messages.length + 2}`,
        content: `Thanks for your message. I'll get back to you shortly.`,
        sender: "employee",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, employeeMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: ChatMessage) => (
    <div
      key={message.id}
      className={`flex items-start gap-2 mb-4 ${
        message.sender === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="h-8 w-8 mt-1">
        {message.sender === "user" ? (
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        ) : (
          <AvatarImage src={`https://avatar.vercel.sh/${employee?.email}`} />
        )}
      </Avatar>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {message.content && <p className="text-sm">{message.content}</p>}
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:no-underline"
                >
                  {file.name}
                </a>
                <span className="text-xs opacity-70">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ))}
          </div>
        )}
        
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://avatar.vercel.sh/${employee.email}`} />
              <AvatarFallback>
                {employee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{employee.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4 space-y-4">
          {messages.map(renderMessage)}
          <div ref={scrollRef} />
        </ScrollArea>

        <div className="p-4 border-t bg-background space-y-4">
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attachments.map((att, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <span className="truncate max-w-[150px]">{att.file.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="hover:bg-muted-foreground/20 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 shrink-0"
              aria-label="Attach files"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() && attachments.length === 0}
              aria-label="Send message"
              className="h-10 w-10 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 