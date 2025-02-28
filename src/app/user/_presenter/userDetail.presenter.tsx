"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

type Item = {
    title: string
    content: string
}

type Props = {
    item: Item;
}


export const UserDetail = ({ item }: Props) => {
  const { back } = useRouter();
    return (
        <Dialog open={true} onOpenChange={back}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
          </DialogHeader>
          <div>
            {item.content}
          </div>
        </DialogContent>
      </Dialog>
    )
};