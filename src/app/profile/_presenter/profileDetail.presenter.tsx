import { Star } from "@/components/ui/star";

type Item = {
    title: string
    content: string
}

type Props = {
    item: Item;
}


export const ProfileDetail = ({ item }: Props) => {
  return (
    <div className="min-h-screen text-white p-6">
    <div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-center mb-8">
      <h1 className="text-3xl font-bold text-center text-yellow-300 flex items-center">
        <Star className="inline mr-2 fill-yellow-300 w-6 h-6" />
        自己紹介
      </h1>
    </div>
    <div className="min-h-screen text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4 h-full">
          <div>
            {item.title}
          </div>

          <div>
            {item.content}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
};